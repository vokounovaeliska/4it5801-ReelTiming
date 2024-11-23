import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class ProjectUser {
  @Field(() => ID)
  id!: string;

  project_id!: string;

  user_id?: string | null;

  department_id?: string | null;

  @Field(() => String, { nullable: true })
  position?: string | null;

  rate_id?: string | null = null;

  @Field(() => Number, { nullable: true })
  number_of_people?: number | null;

  @Field(() => Boolean)
  is_team_leader: boolean = false;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  surname!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Date)
  create_date: Date | undefined;

  @Field(() => String)
  create_user_id: string | undefined;

  @Field(() => String)
  last_update_user_id: string | undefined;

  @Field(() => Date)
  last_update_date: Date | undefined;

  @Field(() => Boolean)
  is_active: boolean | undefined;

  @Field(() => String, { nullable: true })
  role?: string | null;

  @Field(() => String, { nullable: true })
  invitation?: string | null;

  @Field(() => String, { nullable: true })
  phone_number?: string | null;
}

@InputType()
export class ProjectUserInput {
  @Field(() => String)
  project_id!: string;

  @Field(() => String, { nullable: true })
  user_id?: string | null;

  @Field(() => String, { nullable: true })
  department_id?: string | null;

  @Field(() => String, { nullable: true })
  position?: string | null;

  @Field(() => String, { nullable: true })
  rate_id?: string | null;

  @Field(() => Number, { nullable: true })
  number_of_people?: number | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  is_team_leader?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_active?: boolean;

  @Field(() => String, { nullable: true })
  role?: string | null;

  @Field(() => String, { nullable: true })
  invitation?: string | null;

  @Field(() => String, { nullable: true })
  phone_number?: string | null;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  surname?: string;

  @Field(() => String)
  email?: string;
}

@InputType()
export class CreateProjectUserInput {
  @Field(() => String)
  project_id!: string;

  @Field(() => String, { nullable: true })
  user_id?: string | null;

  @Field(() => String, { nullable: true })
  department_id?: string | null;

  @Field(() => String, { nullable: true })
  position?: string | null;

  @Field(() => String, { nullable: true })
  rate_id?: string | null;

  @Field(() => Number, { nullable: true })
  number_of_people?: number | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  is_team_leader?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_active?: boolean;

  @Field(() => String, { nullable: true })
  role?: string | null;

  @Field(() => String, { nullable: true })
  invitation?: string | null;

  @Field(() => String, { nullable: true })
  phone_number?: string | null;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  surname!: string;

  @Field(() => String)
  email!: string;
}
