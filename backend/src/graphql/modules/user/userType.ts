import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;
}

@ObjectType()
export class AuthInfo {
  @Field(() => User)
  user!: User;

  @Field()
  token!: string;
}
