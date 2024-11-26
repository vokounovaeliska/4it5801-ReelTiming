import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { AuthInfo, User, UserInput } from '../user/userType';
import { UserService } from './userService';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  surname: z.string().min(1),
  phone_number: z.string().optional(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  surname: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone_number: z.string().optional(),
  last_update_user_id: z.string().uuid().optional(),
});

const deleteUserSchema = z.object({
  userId: z.string().uuid(),
});

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { db }: CustomContext): Promise<User[]> {
    const userService = new UserService(db);
    return userService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userService = new UserService(db);
    return userService.getUserById(id);
  }

  @Mutation(() => AuthInfo)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const validatedData = signInSchema.parse({ email, password });
    const userService = new UserService(db);
    return userService.signIn(validatedData.email, validatedData.password);
  }

  @Mutation(() => AuthInfo)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Arg('phone_number', { nullable: true }) phone_number: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const validatedData = signUpSchema.parse({
      email,
      password,
      name,
      surname,
      phone_number,
    });
    const userService = new UserService(db);
    return userService.signUp({
      ...validatedData,
      phone_number: validatedData.phone_number || '',
    });
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg('userId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteUserSchema.parse({ userId: id });
    const userService = new UserService(db);
    return userService.deleteUser(validatedData.userId);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('userId') id: string,
    @Arg('data') data: UserInput,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const validatedData = updateUserSchema.parse(data);
    const userService = new UserService(db);
    return userService.updateUser(id, validatedData);
  }
}
