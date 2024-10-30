import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql';

import { getUserRepository } from '@backend/graphql/modules/user/userRepository';
import { createToken } from '@backend/libs/jwt';
import { Db } from '@backend/types/types';

export class UserService {
  constructor(private db: Db) {
    this.userRepository = getUserRepository(db);
  }

  private userRepository;

  /**
   * Get all users in the system
   */
  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  /**
   * Get a user by ID
   * @param id string - user id
   */
  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user || user.length === 0) {
      throw new GraphQLError('User not found');
    }
    return user[0];
  }

  /**
   * Get a user by email
   * @param email string - user email
   */
  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || user.length === 0) {
      throw new GraphQLError('User not found');
    }
    return user[0];
  }

  /**
   * Create a new user
   * @param data - object containing user creation data
   */
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    surname: string;
    //phone_number: string;
    createUserId: string;
  }) {
    const userByEmail = await this.userRepository.getUserByEmail(data.email);

    if (userByEmail.length > 0) {
      throw new GraphQLError('Email already registered');
    }

    const passwordHash = await argon2.hash(data.password);
    const currentDate = new Date();

    const userData = {
      email: data.email,
      password: passwordHash,
      name: data.name,
      surname: data.surname,
      //phone_number: data.phone_number,
      create_date: currentDate,
      create_user_id: data.createUserId,
      last_update_date: currentDate,
      last_update_user_id: data.createUserId,
      is_active: true,
    };

    const userId = await this.userRepository.createUser(userData);
    return userId;
  }

  /**
   * Update a user by ID
   * @param id string - user id
   * @param data - object containing user update data
   */
  async updateUser(
    id: string,
    data: Partial<{
      email: string;
      password: string;
      name: string;
      surname: string;
      //phone_number: string;
      create_date: Date;
      last_update_date: Date;
      is_active: boolean;
    }>,
  ) {
    const user = await this.getUserById(id);
    const updatedUserData = {
      ...user,
      ...data,
      create_date: data.create_date
        ? new Date(data.create_date)
        : user.create_date,
      last_update_date: data.last_update_date
        ? new Date(data.last_update_date)
        : new Date(),
    };

    await this.userRepository.updateUser(id, updatedUserData);
    return updatedUserData;
  }

  /**
   * Delete a user by ID
   * @param id string - user id
   */
  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
    return true;
  }

  /**
   * Sign in a user with email and password
   * @param email string - user email
   * @param password string - user password
   */
  async signIn(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || user.length === 0) {
      throw new GraphQLError('Incorrect email or password');
    }

    const foundUser = user[0];
    const isPasswordValid = await argon2.verify(foundUser.password, password);

    if (!isPasswordValid) {
      throw new GraphQLError('Incorrect email or password');
    }

    const token = createToken({ id: foundUser.id });
    return {
      user: foundUser,
      token,
    };
  }

  /**
   * Sign up a new user
   * @param data - object containing user signup data
   */
  async signUp(data: {
    email: string;
    password: string;
    name: string;
    surname: string;
    //phone_number: string;
  }) {
    const userByEmail = await this.userRepository.getActiveUserByEmail(
      data.email,
    );

    if (userByEmail.length > 0) {
      throw new GraphQLError('Email already registered');
    }

    const passwordHash = await argon2.hash(data.password);
    const currentDate = new Date();

    const newUser = {
      email: data.email,
      password: passwordHash,
      name: data.name,
      surname: data.surname,
      //phone_number: data.phone_number,
      create_date: currentDate,
      create_user_id: 'user-id',
      last_update_date: currentDate,
      last_update_user_id: 'user-id',
      is_active: true,
    };

    const userId = await this.userRepository.createUser(newUser);
    const token = createToken({ id: userId });

    return {
      user: { ...newUser, id: userId },
      token,
    };
  }

  /**
   * Add new crew member - inactive user
   * @param data - object containing user data
   */
  async addInactiveUser(data: {
    name: string;
    surname: string;
    email: string;
    //phone_number: string
  }) {
    const passwordHash = await argon2.hash('default');
    const currentDate = new Date();

    const newUser = {
      email: data.email,
      password: passwordHash,
      name: data.name,
      surname: data.surname,
      //phone_number: data.phone_number,
      create_date: currentDate,
      create_user_id: 'user-id',
      last_update_date: currentDate,
      last_update_user_id: 'user-id',
      is_active: false,
    };

    const userId = await this.userRepository.createUser(newUser);

    return {
      ...newUser,
      id: userId,
    };
  }
}
