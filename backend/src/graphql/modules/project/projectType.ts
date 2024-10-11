import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Project {
  @Field()
  id: string | undefined;

  @Field()
  name: string | undefined;

  @Field({ nullable: true })
  production_company?: string | null;

  @Field({ nullable: true })
  start_date?: Date | null;

  @Field({ nullable: true })
  end_date?: Date | null;

  @Field()
  create_date: Date | undefined;

  @Field()
  create_user_id: string | undefined;

  @Field()
  last_update_user_id: string | undefined;

  @Field()
  last_update_date: Date | undefined;

  @Field()
  is_active: boolean | undefined;
}
