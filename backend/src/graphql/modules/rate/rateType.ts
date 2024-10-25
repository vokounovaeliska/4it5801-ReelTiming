import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Rate {
  @Field(() => ID)
  id!: string;

  @Field(() => Number, { nullable: true })
  standard_rate?: number | null;

  @Field(() => Number, { nullable: true })
  overtime_hour1?: number | null;

  @Field(() => Number, { nullable: true })
  overtime_hour2?: number | null;

  @Field(() => Number, { nullable: true })
  overtime_hour3?: number | null;

  @Field(() => Number, { nullable: true })
  overtime_hour4?: number | null;

  @Field(() => Number, { nullable: true })
  compensation_rate?: number | null;

  @Field(() => Date)
  create_date!: Date;

  @Field(() => String)
  create_user_id!: string;

  @Field(() => String)
  last_update_user_id!: string;

  @Field(() => Date)
  last_update_date!: Date;
}

@InputType()
export class RateInput {
  @Field(() => Number, { nullable: true })
  standard_rate?: number;

  @Field(() => Number, { nullable: true })
  overtime_hour1?: number;

  @Field(() => Number, { nullable: true })
  overtime_hour2?: number;

  @Field(() => Number, { nullable: true })
  overtime_hour3?: number;

  @Field(() => Number, { nullable: true })
  overtime_hour4?: number;

  @Field(() => Number, { nullable: true })
  compensation_rate?: number;

  @Field(() => Date)
  create_date!: Date;

  @Field(() => String)
  create_user_id!: string;

  @Field(() => String)
  last_update_user_id!: string;

  @Field(() => Date)
  last_update_date!: Date;
}
