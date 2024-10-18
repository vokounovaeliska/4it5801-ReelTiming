import { z } from 'zod';

import { zod } from '@frontend/shared/forms';

export const createProjectSchema = z
  .object({
    name: zod
      .string()
      .min(3, { message: 'Project name must be at least 3 characters long ' }),
    description: zod.string().min(1, { message: 'Description is required' }),
    productionCompany: zod
      .string()
      .min(1, { message: 'Production company is required' }),
    startDate: zod
      .date({ message: 'Start date is required.' })
      .refine((date) => date !== null && !isNaN(date.getTime()), {
        message: 'Start date is required',
      }),

    endDate: zod
      .date()
      .nullable() // Allow end date to be nullable
      .refine((date) => date === null || !isNaN(date.getTime()), {
        message: 'End date must be a valid date or empty',
      }),
  })
  .superRefine((data, ctx) => {
    const startDate = data.startDate.setHours(0, 0, 0, 0);
    const endDate = data.endDate?.setHours(0, 0, 0, 0);

    if (endDate !== undefined && endDate < startDate) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date must be the same as or later than start date',
      });
    }
  });
