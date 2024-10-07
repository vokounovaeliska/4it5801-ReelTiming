import { Query, Resolver } from 'type-graphql';

import { formatDate } from '@shared/date';

@Resolver()
export class EmptyResolver {
  @Query(() => String)
  _empty(): string {
    return `Hello, World! ${formatDate(new Date())}`;
  }
}
