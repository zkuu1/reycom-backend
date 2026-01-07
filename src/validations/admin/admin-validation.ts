import z from "zod"

export class adminValidation {
    static readonly CREATE = z.object({
        name_admin: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
        email: z.string().email("Invalid email address").max(100, "Email must be at most 100 characters long"),
        password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long"),
    });

    static readonly UPDATE = z.object({
        name_admin: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long").optional(),
        email: z.string().email("Invalid email address").max(100, "Email must be at most 100 characters long").optional(),
        password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long").optional(),
    });

    static readonly LOGIN = z.object({
        name_admin: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
        password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long"),
    });


}