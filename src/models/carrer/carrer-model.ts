import type { Careers } from "../../generated/prisma/client.js";


export type CreateCarrerRequest = {
    job_date: Date;
    job_name: string;
}

export type CarrerResponse = {
    id_career: number;
    job_date: Date;
    job_name: string;
}

export function toAdminResponse(carrer: Careers): CarrerResponse {
    return {
        id_career: carrer.id,
        job_date: carrer.job_date,
        job_name: carrer.job_name,
    }
}