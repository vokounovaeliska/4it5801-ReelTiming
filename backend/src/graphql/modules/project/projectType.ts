import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  production_company!: string;

  @Field(() => String)
  description?: string | null;

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

@InputType()
export class ProjectInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  production_company?: string;

  @Field(() => String)
  description?: string | null;

  @Field(() => Date, { nullable: true })
  start_date?: Date | null;

  @Field(() => Date, { nullable: true })
  end_date?: Date | null;

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
