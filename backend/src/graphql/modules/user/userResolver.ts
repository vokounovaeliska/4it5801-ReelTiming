import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql/error';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { user } from '@backend/db/schema';
import { createToken } from '@backend/libs/jwt';
import { type CustomContext } from '@backend/types/types';

import { AuthInfo, User } from './userType';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('id') stringId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const id = parseInt(stringId, 10);
    const userRecord = await db.select().from(user).where(eq(user.id, id));

    if (userRecord.length === 0) {
      return null;
    }

    return userRecord[0];
  }

  @Query(() => [User])
  async users(@Ctx() { db }: CustomContext): Promise<User[]> {
    return await db.select().from(user);
  }

  @Mutation(() => AuthInfo)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (userRecord.length === 0) {
      throw new GraphQLError(
        "Incorrect password or user with this email doesn't exist.",
      );
    }

    const foundUser = userRecord[0];
    if (await argon2.verify(foundUser.password, password)) {
      const token = createToken({ id: foundUser.id });

      return {
        user: { ...foundUser },
        token,
      };
    } else {
      throw new GraphQLError(
        "Incorrect password or user with this email doesn't exist.",
      );
    }
  }

  @Mutation(() => AuthInfo)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    /* VALIDATION */

    const userByEmail = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (userByEmail.length > 0) {
      throw new GraphQLError('Email already registered');
    }

    /** PASSWORD HASHING */

    const passwordHash = await argon2.hash(password);

    /* DATABASE INSERT */

    const insertResult = await db
      .insert(user)
      .values({
        email,
        password: passwordHash,
        name,
      })
      .$returningId();

    /* ASSEMBLE MUTATION RESPONSE */

    const id = insertResult[0].id;

    const token = createToken({ id });

    const userObject = {
      id,
      email,
      name,
    };

    return { user: userObject, token: token };
  }
}
