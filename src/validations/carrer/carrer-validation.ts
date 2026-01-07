import z from "zod"

export class carrerValidation {
    static readonly CREATE = z.object({
       job_date: z.date(),
       job_name: z.string().min(5, "Name must be at least 5 characters long").max(50, "Name must be at most 500 characters long"),
    });

    static readonly UPDATE = z.object({
        job_date: z.date().optional(),
        job_name: z.string().min(5, "Name must be at least 5 characters long").max(50, "Name must be at most 500 characters long").optional(),
    });
}