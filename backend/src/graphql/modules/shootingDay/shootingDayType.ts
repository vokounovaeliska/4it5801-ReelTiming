import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class ShootingDay {
  @Field(() => ID)
  id!: string;

  project_id!: string | null;

  @Field(() => Number)
  shooting_day_number!: number;

  @Field(() => Date)
  date!: Date;

  @Field(() => String, { nullable: true })
  event_type?: string | null;
}

@InputType()
export class ShootingDayInput {
  @Field(() => Number)
  shooting_day_number!: number;

  @Field(() => Date)
  date!: Date;

  @Field(() => String, { nullable: true })
  event_type?: string | null;

  @Field(() => String)
  project_id!: string;
}
