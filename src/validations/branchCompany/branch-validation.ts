import z from "zod"

export class BranchValidation {

    static readonly CREATE = z.object({
     name_branch: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Name company must be at least 1 character long').max(50, 'Name maximum 50 characters'),
    ),
    companyId: z.preprocess(
    (v) => (v == null ? '' : v),
    z.number().int().positive().min(1, 'CompanyId be at least 1 character long').max(5, 'Company Id 5 characters'),
    ),
    street_address: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().max(255, 'Street address maximum 255 characters'),
    ),
    phone: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().max(20, 'Phone maximum 20 characters'),
    ),
    email: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().email('Invalid email format').max(100, 'Email maximum 100 characters'),
    ),
    website: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().url('Invalid website URL').max(100, 'Website maximum 100 characters'),
    ),
    }).strict();

    static readonly UPDATE= z.object({
     name_branch: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Name company must be at least 1 character long').max(50, 'Name maximum 50 characters'),
    ).optional(),
    companyId: z.preprocess(
    (v) => (v == null ? '' : v),
    z.number().int().positive().min(1, 'CompanyId be at least 1 character long').max(5, 'Company Id 5 characters'),
    ).optional(),
    street_address: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().max(255, 'Street address maximum 255 characters'),
    ).optional(),
    phone: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().max(20, 'Phone maximum 20 characters'),
    ).optional(),
    email: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().email('Invalid email format').max(100, 'Email maximum 100 characters'),
    ).optional(),
    website: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().url('Invalid website URL').max(100, 'Website maximum 100 characters'),
    ).optional(),
    }).strict();
}