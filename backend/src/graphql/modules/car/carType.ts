import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Car {
  @Field(() => ID)
  id!: string;

  project_user_id!: string | null;

  @Field(() => String)
  name!: string;

  @Field(() => Number)
  kilometer_allow!: number;

  @Field(() => Number)
  kilometer_rate!: number;

  @Field(() => Date)
  create_date: Date | undefined;

  @Field(() => String)
  create_user_id: string | undefined;

  @Field(() => String)
  last_update_user_id: string | undefined;

  @Field(() => Date)
  last_update_date: Date | undefined;
}

@InputType()
export class CarInput {
  @Field(() => String)
  project_user_id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Number)
  kilometer_allow!: number;

  @Field(() => Number)
  kilometer_rate!: number;

  @Field(() => Date, { nullable: true })
  create_date?: Date;

  @Field(() => String, { nullable: true })
  create_user_id?: string;

  @Field(() => String, { nullable: true })
  last_update_user_id?: string;

  @Field(() => Date, { nullable: true })
  last_update_date?: Date;
}
