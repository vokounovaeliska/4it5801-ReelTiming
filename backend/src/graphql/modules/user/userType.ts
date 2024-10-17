import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
   @Field(() => ID)
   id!: string;

   @Field(() => String)
   name!: string;

   @Field(() => String)
   email!: string;

   @Field(() => String, { nullable: true })
   app_role_id?: string | null;

   @Field(() => String, { nullable: true })
   phone_number?: string | null;

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
   email?: string;

   @Field(() => String, { nullable: true })
   app_role_id?: string | null;

   @Field(() => String, { nullable: true })
   phone_number?: string | null;

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
}
