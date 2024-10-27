import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { Rate, RateInput } from './rateType';
import { RateService } from './rateService';

@Resolver(() => Rate)
export class RateResolver {
  @Query(() => [Rate])
  async rates(@Ctx() { db }: CustomContext): Promise<Rate[]> {
    const rateService = new RateService(db);
    return rateService.getAllRates();
  }

  @Query(() => Rate, { nullable: true })
  async rate(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Rate | null> {
    const rateService = new RateService(db);
    return rateService.getRateById(id);
  }

  @Mutation(() => Boolean)
  async deleteRate(
    @Arg('rateId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const rateService = new RateService(db);
    return rateService.deleteRate(id);
  }

  @Mutation(() => Rate)
  async updateRate(
    @Arg('rateId') id: string,
    @Arg('data') data: RateInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Rate | null> {
    const rateService = new RateService(db);
    return rateService.updateRate(id, data);
  }

  @Mutation(() => Rate)
  async addRate(
    @Arg('standard_rate') standardRate: number,
    @Arg('overtime_hour1') overtimeHour1: number,
    @Arg('overtime_hour2') overtimeHour2: number,
    @Arg('overtime_hour3') overtimeHour3: number,
    @Arg('overtime_hour4') overtimeHour4: number,
    @Arg('compensation_rate') compensationRate: number,

    @Ctx() { db }: CustomContext,
  ): Promise<Rate> {
    const rateService = new RateService(db);
    const data: RateInput = {
      standard_rate: standardRate,
      overtime_hour1: overtimeHour1,
      overtime_hour2: overtimeHour2,
      overtime_hour3: overtimeHour3,
      overtime_hour4: overtimeHour4,
      compensation_rate: compensationRate,
    };
    return rateService.createRate(data);
  }
}
