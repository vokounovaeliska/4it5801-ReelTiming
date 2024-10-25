import { eq } from 'drizzle-orm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { rate } from '@backend/db/schema';
import { CustomContext } from '@backend/types/types';

import { Rate, RateInput } from './rateType';

@Resolver(() => Rate)
export class RateResolver {
  @Query(() => [Rate])
  async rates(@Ctx() { db }: CustomContext): Promise<Rate[]> {
    const rates = await db.select().from(rate).orderBy(rate.create_date);

    return rates.map((rate) => ({
      ...rate,
    }));
  }

  @Query(() => Rate, { nullable: true })
  async rate(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Rate | null> {
    const rateRecord = await db.select().from(rate).where(eq(rate.id, id));

    if (rateRecord.length === 0) {
      return null;
    }

    return rateRecord[0];
  }

  @Mutation(() => Boolean)
  async deleteRate(
    @Arg('rateId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    await db.delete(rate).where(eq(rate.id, id));
    return true;
  }

  @Mutation(() => Rate)
  async updateRate(
    @Arg('rateId') id: string,
    @Arg('data') data: RateInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Rate | null> {
    const rateObject = await db.select().from(rate).where(eq(rate.id, id));

    if (rateObject.length === 0) {
      return null;
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    );

    const updatedRate = {
      ...rateObject[0],
      ...cleanData,
      create_date: data.create_date
        ? new Date(data.create_date)
        : rateObject[0].create_date,
      last_update_date: data.last_update_date
        ? new Date(data.last_update_date)
        : rateObject[0].last_update_date,
    };

    await db.update(rate).set(updatedRate).where(eq(rate.id, id));

    return updatedRate;
  }
}
