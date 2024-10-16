import { Field, ID, ObjectType } from 'type-graphql';

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
