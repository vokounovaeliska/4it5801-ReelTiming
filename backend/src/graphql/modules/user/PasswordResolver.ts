import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { AuthInfo } from './userType';
import { PasswordService } from './passwordService';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(6),
});

@Resolver()
export class PasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = forgotPasswordSchema.parse({ email });
    const passwordService = new PasswordService(db);
    return passwordService.forgotPassword(validatedData.email);
  }

  @Mutation(() => AuthInfo)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const validatedData = resetPasswordSchema.parse({ token, newPassword });
    const passwordService = new PasswordService(db);
    return passwordService.resetPassword(
      validatedData.token,
      validatedData.newPassword,
    );
  }
}
