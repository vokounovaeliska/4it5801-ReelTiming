import { ReportItem } from '../interfaces/interface';

export const cleanReportItems = (items: ReportItem[] | undefined | null) => {
  if (!items) return [];
  return items.map((item) => {
    if ('__typename' in item) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...rest } = item;
      return rest;
    }
    return item;
  });
};
