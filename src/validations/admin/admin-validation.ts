import { z } from 'zod';

export class adminValidation {

  static readonly CREATE = z.object({
    name_admin: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(3, 'Name Admin must be at least 3 characters long')
        .max(50, 'Nama Admin maximum 50 characters'),
    ),

    email: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(1, 'Email must be at least 1 character long')
        .email('Email format is invalid')
        .max(100, 'Email maximum 100 characters'),
    ),

    password: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password maximum 100 characters'),
    ),
  });

  static readonly UPDATE = z.object({
    name_admin: z.preprocess(
      (v) => (v == null ? undefined : v),
      z.string()
        .min(3, 'Name Admin must be at least 3 characters long')
        .max(50, 'Name Admin maximum 50 characters')
        .optional(),
    ),

    email: z.preprocess(
      (v) => (v == null ? undefined : v),
      z.string()
        .email('Email format is invalid')
        .max(100, 'Email maximum 100 characters')
        .optional(),
    ),

    password: z.preprocess(
      (v) => (v == null ? undefined : v),
      z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password maximum 100 characters')
        .optional(),
    ),
  });

  static readonly LOGIN = z.object({
    name_admin: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(3, 'Name Admin must be at least 3 characters long')
        .max(50, 'Name Admin maximum 50 characters'),
    ),

    password: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password maximum 100 characters'),
    ),
  });



}
