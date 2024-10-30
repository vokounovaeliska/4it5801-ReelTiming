import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { AuthInfo, User, UserInput } from '../user/userType';
import { UserService } from './userService';

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
    const userService = new UserService(db);
    return userService.signIn(email, password);
  }

  @Mutation(() => AuthInfo)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const userService = new UserService(db);
    return userService.signUp({ email, password, name, surname });
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg('userId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const userService = new UserService(db);
    return userService.deleteUser(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('userId') id: string,
    @Arg('data') data: UserInput,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userService = new UserService(db);
    return userService.updateUser(id, data);
  }

  @Mutation(() => User)
  async addInactiveUser(
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Arg('email') email: string,
    @Ctx() { db }: CustomContext,
  ): Promise<User> {
    const userService = new UserService(db);
    return userService.addInactiveUser({ name, surname, email });
  }
}
