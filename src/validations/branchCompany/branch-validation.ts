import z from "zod"

export class BranchValidation {

  // ===============================
  // CREATE
  // ===============================
  static readonly CREATE = z.object({

    nameBranch: z.string()
      .min(1, "Name branch required")
      .max(50),

    // ✅ support number & string number
    companyId: z.coerce.number()
      .int()
      .positive(),

    streetAddress: z.string()
      .max(255)
      .optional(),

    phone: z.string()
      .max(20)
      .optional(),

    email: z.string()
      .email()
      .max(100)
      .optional(),

    website: z.string()
      .url()
      .max(100)
      .optional(),

  }).strict()


  // ===============================
  // UPDATE
  // ===============================
  static readonly UPDATE = z.object({

    nameBranch: z.string()
      .min(1)
      .max(50)
      .optional(),

    companyId: z.coerce.number()
      .int()
      .positive()
      .optional(),

    streetAddress: z.string()
      .max(255)
      .optional(),

    phone: z.string()
      .max(20)
      .optional(),

    email: z.string()
      .email()
      .max(100)
      .optional(),

    website: z.string()
      .url()
      .max(100)
      .optional(),

  }).strict()

}