import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class DailyReport {
  @Field(() => ID)
  id!: string;

  project_id!: string | null;

  shooting_day_id!: string | null;

  @Field(() => [ReportItem])
  intro!: ReportItem[];

  @Field(() => [ReportItem])
  shooting_progress!: ReportItem[];

  @Field(() => [ReportItem])
  footer!: ReportItem[];

  @Field(() => Date, { nullable: true })
  create_date?: Date;

  @Field(() => Date, { nullable: true })
  last_update_date?: Date;
}

@InputType()
export class DailyReportInput {
  @Field(() => String)
  project_id!: string;

  @Field(() => String)
  shooting_day_id!: string;

  @Field(() => [ReportItemInput])
  intro!: ReportItemInput[];

  @Field(() => [ReportItemInput])
  shooting_progress!: ReportItemInput[];

  @Field(() => [ReportItemInput])
  footer!: ReportItemInput[];
}

@ObjectType()
export class ReportItem {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  value!: string;
}

@InputType()
export class ReportItemInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  value!: string;
}
