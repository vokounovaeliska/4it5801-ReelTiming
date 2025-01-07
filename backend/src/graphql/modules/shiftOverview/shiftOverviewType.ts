import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class ShiftOverview {
  @Field(() => ID)
  id!: string;

  project_id!: string | null;

  @Field(() => [Crew])
  crew_working!: Crew[];

  @Field(() => Date)
  date!: Date | null;
}

@InputType()
export class ShiftOverviewInput {
  @Field(() => String)
  project_id!: string;

  @Field(() => [CrewInput])
  crew_working!: CrewInput[];

  @Field(() => Date)
  date!: Date;
}

@ObjectType()
export class Crew {
  @Field(() => String)
  id!: string;
}

@InputType()
export class CrewInput {
  @Field(() => String)
  id!: string;
}
