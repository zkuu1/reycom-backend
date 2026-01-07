import { z } from 'zod';

export class applyValidation {
   static readonly CREATE = z.object({
  name_apply: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Nama wajib diisi').max(50, 'Nama maksimal 50 karakter'),
  ),

  email: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  ),

  no_hp: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(10, 'No HP minimal 10 digit'),
  ),

  gender: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(2, 'Gender wajib diisi').max(15),
  ),

  domicile: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(2, 'Domisili wajib diisi').max(50),
  ),

  resume: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Resume wajib diisi').min(5, 'Resume minimal 5 karakter'),
  ),
});


  static readonly UPDATE = z.object({
  name_apply: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(1, 'Nama minimal 1 karakter').max(50, 'Nama maksimal 50 karakter').optional(),
  ),

  email: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().email('Format email tidak valid').optional(),
  ),

  no_hp: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(10, 'No HP minimal 10 digit').optional(),
  ),

  gender: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(2, 'Gender minimal 2 karakter').max(15, 'Gender maksimal 15 karakter').optional(),
  ),

  domicile: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(2, 'Domisili minimal 2 karakter').max(50, 'Domisili maksimal 50 karakter').optional(),
  ),

  resume: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(5, 'Resume minimal 5 karakter').optional(),
  ),
});

}
