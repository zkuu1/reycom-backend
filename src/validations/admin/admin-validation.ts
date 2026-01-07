import { z } from 'zod';

export class adminValidation {

  static readonly CREATE = z.object({
    name_admin: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(3, 'Nama admin minimal 3 karakter')
        .max(50, 'Nama admin maksimal 50 karakter'),
    ),

    email: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(1, 'Email wajib diisi')
        .email('Format email tidak valid')
        .max(100, 'Email maksimal 100 karakter'),
    ),

    password: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(6, 'Password minimal 6 karakter')
        .max(100, 'Password maksimal 100 karakter'),
    ),
  });

  static readonly UPDATE = z.object({
    name_admin: z.preprocess(
      (v) => (v == null ? undefined : v),
      z.string()
        .min(3, 'Nama admin minimal 3 karakter')
        .max(50, 'Nama admin maksimal 50 karakter')
        .optional(),
    ),

    email: z.preprocess(
      (v) => (v == null ? undefined : v),
      z.string()
        .email('Format email tidak valid')
        .max(100, 'Email maksimal 100 karakter')
        .optional(),
    ),

    password: z.preprocess(
      (v) => (v == null ? undefined : v),
      z.string()
        .min(6, 'Password minimal 6 karakter')
        .max(100, 'Password maksimal 100 karakter')
        .optional(),
    ),
  });

  static readonly LOGIN = z.object({
    name_admin: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(3, 'Nama admin minimal 3 karakter')
        .max(50, 'Nama admin maksimal 50 karakter'),
    ),

    password: z.preprocess(
      (v) => (v == null ? '' : v),
      z.string()
        .min(6, 'Password wajib diisi ')
        .max(100, 'Password maksimal 100 karakter'),
    ),
  });

}
