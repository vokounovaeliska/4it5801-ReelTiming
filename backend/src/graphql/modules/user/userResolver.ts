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
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userRecord = await db.select().from(user).where(eq(user.id, id));

    if (userRecord.length === 0) {
      return null;
    }

    return userRecord[0];
  }

  @Query(() => [User])
  async users(@Ctx() { db }: CustomContext): Promise<User[]> {
    const users = await db
      .select()
      .from(user)
      .orderBy(user.create_date);

    return users.map((user) => ({
      ...user,
      create_date: new Date(user.create_date),
      is_active: !!user.is_active,
    }));
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
      throw new GraphQLError('Unauthorized.');
    }

    const foundUser = userRecord[0];
    if (await argon2.verify(foundUser.password, password)) {
      const token = createToken({ id: foundUser.id });

      return {
        user: { ...foundUser },
        token,
      };
    } else {
      throw new GraphQLError('Unauthorized.');
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
    const createdAt = new Date();

    const insertResult = await db
      .insert(user)
      .values({
        email,
        password: passwordHash,
        name,
        create_date: createdAt,
        create_user_id: 'user-id', // Replace with actual user ID
        last_update_date: createdAt,
        last_update_user_id: 'user-id', // Replace with actual user ID
        is_active: true,
      })
      .$returningId();

    /* ASSEMBLE MUTATION RESPONSE */

    const id = insertResult[0].id;

    const token = createToken({ id });

    const userObject = await db
      .select()
      .from(user)
      .where(eq(user.id, id));

    if (userObject.length === 0) {
      throw new GraphQLError('User not created.');
    }


    return { user: userObject[0], token: token };
  }
}
