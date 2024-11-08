import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Report {
  @Field(() => ID)
  id!: string;

  project_user_id?: string | null;

  project_id?: string | null;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  path!: string;

  @Field(() => Date)
  start_date!: Date;

  @Field(() => Date)
  end_date!: Date;

  @Field(() => Date)
  create_date!: Date | undefined;

  create_user_id!: string | undefined;
}

@InputType()
export class ReportInput {
  @Field(() => String, { nullable: true })
  project_user_id?: string | null;

  @Field(() => String, { nullable: true })
  project_id?: string | null;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  path!: string;

  @Field(() => Date)
  start_date!: Date;

  @Field(() => Date)
  end_date!: Date;

  @Field(() => Date, { nullable: true })
  create_date?: Date;

  create_user_id!: string;
}
