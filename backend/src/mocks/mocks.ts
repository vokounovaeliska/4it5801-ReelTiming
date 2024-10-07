import { faker } from '@faker-js/faker';
import { IMockStore } from '@graphql-tools/mock';

import { createToken } from '@backend/libs/jwt';
import { formatDate } from '@shared/date';

faker.seed(42);

const randomDelay = async (max: number = 500, min: number = 50) =>
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min, max })),
  );

export const mockResolvers = (
  _store: IMockStore, // you can use this to implement pseudo-functionality (e.g. adding a quack)
) => {
  const generateRandomUser = (id: number) => ({
    id: `${id}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  });

  const USERS = Array(4)
    .fill(null)
    .map((_, index) => generateRandomUser(index + 1));

  const CURRENT_USER = USERS[0];

  return {
    Query: {
      _empty() {
        return `You are using GraphQL mocks. ${formatDate(new Date())}`;
      },
      async user(_parent: unknown, args: { id: string }) {
        await randomDelay();
        return USERS.find(({ id }) => args.id === id) ?? null;
      },
      async users() {
        await randomDelay();
        return USERS;
      },
    },
    Mutation: {
      async signIn() {
        await randomDelay();
        return {
          user: CURRENT_USER,
          token: createToken({ id: CURRENT_USER.id }),
        };
      },
      async signUp() {
        await randomDelay();
        return {
          user: CURRENT_USER,
          token: createToken({ id: CURRENT_USER.id }),
        };
      },
    },
  };
};
