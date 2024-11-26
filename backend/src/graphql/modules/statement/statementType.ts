import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Statement {
  @Field(() => ID)
  id!: string;

  project_user_id!: string;

  @Field(() => Date)
  start_date!: Date;

  @Field(() => Date)
  from!: Date;

  @Field(() => Date)
  to!: Date;

  @Field(() => Number)
  shift_lenght!: number;

  @Field(() => Number, { nullable: true })
  calculated_overtime?: number | null;

  @Field(() => Number, { nullable: true })
  claimed_overtime?: number | null;

  @Field(() => Date)
  create_date: Date | undefined;

  @Field(() => String)
  create_user_id: string | undefined;

  @Field(() => String)
  last_update_user_id: string | undefined;

  @Field(() => Date)
  last_update_date: Date | undefined;

  car_id?: string | null;

  @Field(() => Number, { nullable: true })
  kilometers?: number | null;
}

@InputType()
export class StatementInput {
  @Field(() => Date)
  start_date!: Date;

  @Field(() => String)
  project_user_id!: string;

  @Field(() => Date)
  from!: Date;

  @Field(() => Date)
  to!: Date;

  @Field(() => Number)
  shift_lenght!: number;

  @Field(() => Number, { nullable: true })
  calculated_overtime?: number | null;

  @Field(() => Number, { nullable: true })
  claimed_overtime?: number | null;

  @Field(() => Date, { nullable: true })
  create_date?: Date;

  @Field(() => String, { nullable: true })
  create_user_id?: string;

  @Field(() => String, { nullable: true })
  last_update_user_id?: string;

  @Field(() => Date, { nullable: true })
  last_update_date?: Date;

  @Field(() => String, { nullable: true })
  car_id?: string | null;

  @Field(() => Number, { nullable: true })
  kilometers?: number | null;
}
