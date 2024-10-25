import * as argon2 from 'argon2';
import { and, eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql/error';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { user } from '@backend/db/schema';
import { createToken } from '@backend/libs/jwt';
import { CustomContext } from '@backend/types/types';

import { AuthInfo, User, UserInput } from '../user/userType';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { db }: CustomContext): Promise<User[]> {
    const users = await db.select().from(user).orderBy(user.create_date);

    return users.map((user) => ({
      ...user,
      create_date: new Date(user.create_date),
      is_active: !!user.is_active,
    }));
  }

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
    @Arg('surname') surname: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const userByEmail = await db
      .select()
      .from(user)
      .where(and(eq(user.email, email), eq(user.is_active, true)));
    if (userByEmail.length > 0) {
      throw new GraphQLError('Email already registered');
    }

    const passwordHash = await argon2.hash(password);
    const createdAt = new Date();

    const insertResult = await db
      .insert(user)
      .values({
        email,
        password: passwordHash,
        name,
        surname,
        create_date: createdAt,
        create_user_id: 'user-id',
        last_update_date: createdAt,
        last_update_user_id: 'user-id',
        is_active: true,
      })
      .$returningId();

    const id = insertResult[0].id;
    const token = createToken({ id });

    const userObject = await db.select().from(user).where(eq(user.id, id));

    if (userObject.length === 0) {
      throw new GraphQLError('User not created.');
    }

    return { user: userObject[0], token: token };
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg('userId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    await db.delete(user).where(eq(user.id, id));
    return true;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('userId') id: string,
    @Arg('data') data: UserInput,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userObject = await db.select().from(user).where(eq(user.id, id));

    if (userObject.length === 0) {
      return null;
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    );

    const updatedUser = {
      ...userObject[0],
      ...cleanData,
      create_date: data.create_date
        ? new Date(data.create_date)
        : userObject[0].create_date,
      last_update_date: data.last_update_date
        ? new Date(data.last_update_date)
        : userObject[0].last_update_date,
    };

    await db.update(user).set(updatedUser).where(eq(user.id, id));

    return updatedUser;
  }
}
