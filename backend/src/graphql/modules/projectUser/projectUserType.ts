import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class ProjectUser {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  project_id!: string;

  @Field(() => String)
  user_id!: string;

  @Field(() => String, { nullable: true })
  group_id?: string | null;

  @Field(() => String, { nullable: true })
  position?: string | null;

  @Field(() => String, { nullable: true })
  rate_id?: string | null = null;

  @Field(() => Number, { nullable: true })
  number_of_people?: number | null;

  @Field(() => String, { nullable: true })
  car_numberplate?: string | null;

  @Field(() => Boolean)
  is_team_leader: boolean = false;

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
export class ProjectUserInput {
  @Field(() => String, { nullable: true })
  group_id?: string | null;

  @Field(() => String, { nullable: true })
  position?: string | null;

  @Field(() => String, { nullable: true })
  rate_id?: string | null;

  @Field(() => Number, { nullable: true })
  number_of_people?: number | null;

  @Field(() => String, { nullable: true })
  car_numberplate?: string | null;

  @Field(() => Boolean, { nullable: true })
  is_team_leader?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_active?: boolean;
}
