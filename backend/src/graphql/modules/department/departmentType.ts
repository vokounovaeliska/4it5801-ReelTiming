import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Department {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;
}

@InputType()
export class DepartmentInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
