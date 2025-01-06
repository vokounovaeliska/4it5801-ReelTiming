import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Department {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  project_id!: string | null;

  @Field(() => Number, { nullable: true })
  order_index: number | undefined | null;

  @Field(() => Boolean, { nullable: true })
  is_visible: boolean | undefined | null;
}

@InputType()
export class DepartmentInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  project_id!: string;

  @Field(() => Number, { nullable: true })
  order_index?: number | undefined;

  @Field(() => Boolean, { nullable: true })
  is_visible?: boolean | undefined;
}
