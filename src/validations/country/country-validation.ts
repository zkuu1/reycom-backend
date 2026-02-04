import z from "zod";

export class CountryValidation {
    static readonly CREATE = z.object({
        name_country: z.preprocess(
         (v) => (v == null ? '' : v),
         z.string().min(1, 'Name country must be at least 1 character long').max(50, 'Name maximum 50 characters'),
         ),
         }).strict();

    static readonly UPDATE = z.object({
        name_country: z.preprocess(
         (v) => (v == null ? '' : v),
         z.string().min(1, 'Name country must be at least 1 character long').max(50, 'Name maximum 50 characters'),
        ).optional()
         }).strict();
}