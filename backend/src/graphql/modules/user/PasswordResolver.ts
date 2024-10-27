import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { AuthInfo } from './userType';
import { PasswordService } from './passwordService';

@Resolver()
export class PasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const passwordService = new PasswordService(db);
    return passwordService.forgotPassword(email);
  }

  @Mutation(() => AuthInfo)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const passwordService = new PasswordService(db);
    return passwordService.resetPassword(token, newPassword);
  }
}
