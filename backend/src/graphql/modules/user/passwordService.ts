import { GraphQLError } from 'graphql';
import * as argon2 from 'argon2';

import { getUserRepository } from '@backend/graphql/modules/user/userRepository';
import { Db } from '@backend/types/types';
import { randomBytes } from 'crypto';
import { APP_LINK } from '@backend/config';
import path from 'path';
import { promises as fs } from 'fs';
import { sendMail } from '@backend/mailer/mailer';
import { createToken } from '@backend/libs/jwt';
import { AuthInfo } from './userType';

export class PasswordService {
  constructor(private db: Db) {
    this.userRepository = getUserRepository(db);
  }

  private userRepository;
  /**
   * Create a new user
   * @param data - object containing user creation data
   */

  async forgotPassword(email: string): Promise<boolean> {
    const userByEmail = await this.userRepository.getActiveUserByEmail(email);

    if (userByEmail.length === 0) {
      throw new GraphQLError('Email not found');
    }

    const token = randomBytes(32).toString('hex'); // Generate token
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 3); // Token valid for 1 hour

    this.userRepository.updatePasswordToken(email, token, expirationTime);

    const resetLink = APP_LINK + `/auth/new-password?token=${token}`;
    try {
      // Read the HTML template
      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'mailer',
        'password-reset-email.html',
      );

      let htmlContent = await fs.readFile(templatePath, 'utf-8');
      htmlContent = htmlContent.replace('{{resetLink}}', resetLink);

      await sendMail(email, 'Password Reset', htmlContent);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new GraphQLError('Failed to send password reset email.');
    }

    return true;
  }

  async resetPassword(token: string, newPassword: string): Promise<AuthInfo> {
    const userRecord = await this.userRepository.getUserByPasswordToken(token);

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

    const hashedPassword = await argon2.hash(newPassword);

    const newToken = createToken({ id: foundUser.id });

    this.userRepository.updateUser(foundUser.id, {
      password: hashedPassword,
      password_reset_token: null,
      password_reset_expiration_time: null,
    });

    return {
      user: { ...foundUser },
      token: newToken,
    };
  }
}
