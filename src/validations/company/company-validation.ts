import z from "zod"

export class CompanyValidation {
    static readonly CREATE = z.object({
        name_company: z.preprocess(
         (v) => (v == null ? '' : v),
         z.string().min(1, 'Name company must be at least 1 character long').max(50, 'Name maximum 50 characters'),
         ),
         countryId: z.preprocess(
         (v) => (v == null ? '' : v),
         z.number().int().positive().min(1, 'CountryId be at least 1 character long').max(5, 'Company Id 5 characters'),
         ),
         }).strict();

    static readonly UPDATE = z.object({
        name_company: z.preprocess(
         (v) => (v == null ? '' : v),
         z.string().min(1, 'Name company must be at least 1 character long').max(50, 'Name maximum 50 characters'),
         ).optional(),

         countryId: z.preprocess(
         (v) => (v == null ? '' : v),
         z.number().int().positive().min(1, 'CountryId be at least 1 character long').max(5, 'Company Id 5 characters'),
         ).optional()
         }).strict();
}