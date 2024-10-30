import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  surname!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Date)
  create_date!: Date | undefined;

  @Field(() => String)
  create_user_id!: string | undefined;

  @Field(() => String)
  last_update_user_id!: string | undefined;

  @Field(() => Date)
  last_update_date!: Date | undefined;

  @Field(() => Boolean)
  is_active: boolean = true;

  @Field(() => String, { nullable: true })
  password_reset_token?: string | null;

  @Field(() => Date, { nullable: true })
  password_reset_expiration_time?: Date | null;

  //@Field(() => String)
  //phone_number!: string;
}

@ObjectType()
export class AuthInfo {
  @Field(() => User)
  user!: User;

  @Field()
  token!: string;
}

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  create_date?: Date;

  @Field(() => String, { nullable: true })
  create_user_id?: string;

  @Field(() => String, { nullable: true })
  last_update_user_id?: string;

  @Field(() => Date, { nullable: true })
  last_update_date?: Date;

  @Field(() => Boolean, { nullable: true })
  is_active?: boolean;

  @Field(() => String, { nullable: true })
  password_reset_token?: string | null;

  @Field(() => Date, { nullable: true })
  password_reset_expiration_time?: Date | null;

  //@Field(() => String)
  //phone_number?: string;
}
