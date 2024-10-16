import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Project {
   @Field(() => ID)
   id: number | undefined;

   @Field(() => String)
   name: string | undefined;

   @Field({ nullable: true })
   production_company?: string;

   @Field(() => Date, { nullable: true })
   start_date: Date | null = null;

   @Field(() => Date, { nullable: true })
   end_date: Date | null = null;

   @Field(() => Date)
   create_date: Date | undefined;

   @Field(() => String)
   create_user_id: string | undefined;

   @Field(() => String)
   last_update_user_id: string | undefined;

   @Field(() => Date)
   last_update_date: Date | undefined;

   @Field(() => Boolean)
   is_active: boolean = true;
}
