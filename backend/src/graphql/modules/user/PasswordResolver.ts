import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql/error';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

//import { APP_LINK } from '@backend/config';
import { user } from '@backend/db/schema';
import { createToken } from '@backend/libs/jwt';
import { CustomContext } from '@backend/types/types';

import { AuthInfo } from './userType';

@Resolver()
export class PasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.email, email));
    if (userRecord.length === 0) {
      throw new GraphQLError('Email not found');
    }
    const token = randomBytes(32).toString('hex'); // Generate token
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 3); // Token valid for 1 hour

    // Update user with token and expiration time
    await db
      .update(user)
      .set({
        password_reset_token: token,
        password_reset_expiration_time: expirationTime,
      })
      .where(eq(user.email, email));

    //const resetLink = APP_LINK + `/auth/new-password?token=${token}`;

    // TODO Send email
    /*     await sendEmail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Use the following link: ${resetLink}`,
    }); */

    return true;
  }

  @Mutation(() => AuthInfo)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { db }: CustomContext,
  ): Promise<AuthInfo> {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.password_reset_token, token));

    if (userRecord.length === 0) {
      throw new GraphQLError('Invalid token.');
    }

    const foundUser = userRecord[0];

    // Check if the token has expired
    if (
      foundUser !== null &&
      foundUser.password_reset_expiration_time != null &&
      new Date() > new Date(foundUser.password_reset_expiration_time)
    ) {
      throw new GraphQLError('Invalid token.');
    }

    // Hash the new password
    const hashedPassword = await argon2.hash(newPassword);

    const newToken = createToken({ id: foundUser.id });

    // Update the user with the new password and clear the reset token and expiration time
    await db
      .update(user)
      .set({
        password: hashedPassword,
        password_reset_token: null,
        password_reset_expiration_time: null,
      })
      .where(eq(user.id, foundUser.id));

    return {
      user: { ...foundUser },
      token: newToken,
    };
  }
}
