import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';
import * as zod from 'zod';

export { zodResolver } from '@hookform/resolvers/zod';

const zodPhoneNumber = zod
  .string()
  .min(1, { message: 'Phone number is required' })
  .refine(
    (val) => {
      const phoneNumber = parsePhoneNumberFromString(val, 'CZ');
      return phoneNumber?.isValid() ?? false;
    },
    {
      message:
        'Invalid phone number format. Example: +420607887591 or 420607887591',
    },
  );

export const registrationFormSchema = zod
  .object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(10, 'Password must be at least 10 characters long'),
    passwordConfirmation: zod
      .string()
      .min(10, 'Password confirmation must be at least 10 characters long'),
    name: zod.string().min(1, 'Name is required'),
    surname: zod.string().min(1, 'Surname is required'),
    terms: zod
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions',
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

export type registrationFormValues = zod.infer<typeof registrationFormSchema>;

export const crewListFormSchema = zod.object({
  name: zod.string().min(1),
  surname: zod.string().min(1),
  department: zod.string().min(1, { message: 'Department must be selected.' }),
  position: zod.string().min(1).nullable().optional(),
  phone_number: zodPhoneNumber,
  email: zod.string().email().min(1),
  standard_rate: zod
    .preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      zod.number().nonnegative({ message: 'Must be a non-negative number' }),
    )
    .nullable()
    .optional(),
  compensation_rate: zod
    .preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      zod.number().nonnegative({ message: 'Must be a non-negative number' }),
    )
    .nullable()
    .optional(),
  overtime_hour1: zod
    .preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      zod.number().nonnegative({ message: 'Must be a non-negative number' }),
    )
    .nullable()
    .optional(),
  overtime_hour2: zod
    .preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      zod.number().nonnegative({ message: 'Must be a non-negative number' }),
    )
    .nullable()
    .optional(),
  overtime_hour3: zod
    .preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      zod.number().nonnegative({ message: 'Must be a non-negative number' }),
    )
    .nullable()
    .optional(),
  overtime_hour4: zod
    .preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      zod.number().nonnegative({ message: 'Must be a non-negative number' }),
    )
    .nullable()
    .nullable()
    .optional(),
  role: zod.string().default('CREW').nullable().optional(),
  // cars: zod.array(carSchema).default([]),
});

export type crewListFormValues = zod.infer<typeof crewListFormSchema>;

export const projectFormSchema = z
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
      .nullable()
      .refine((date) => date === null || !isNaN(date.getTime()), {
        message: 'End date must be a valid date or empty',
      }),
    currency: zod.string().length(3, { message: 'Currency must be selected.' }),
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

export type projectFormValues = zod.infer<typeof projectFormSchema>;

export const newPasswordFormSchema = zod
  .object({
    newPassword: zod.string().min(10, {
      message: 'Password is too short. It must be at least 10 characters long',
    }),
    newPasswordConfirmation: zod
      .string()
      .min(1, { message: 'Password confirmation is required' }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirmation) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
        message: 'Passwords must match',
      });
    }
    if (data.newPassword && data.newPassword.length < 10) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['password'],
        message: 'Password is too short',
      });
    }
  });

export type newPasswordFormValues = zod.infer<typeof newPasswordFormSchema>;

export const forgotPasswordFormSchema = zod.object({
  email: zod.string().min(1, { message: 'Email is required!' }).email({
    message:
      'Invalid email format. It must be in the format example@domain.com',
  }),
});

export type forgotPasswordFormaValues = zod.infer<
  typeof forgotPasswordFormSchema
>;

export const loginFormSchema = zod.object({
  email: zod.string().email().min(1),
  password: zod
    .string()
    .min(10, 'Password must be at least 10 characters long'),
});

export type loginFormValues = zod.infer<typeof loginFormSchema>;
