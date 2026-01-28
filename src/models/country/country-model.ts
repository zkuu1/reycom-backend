import type { Country } from "../../generated/prisma/client.js"

import type { Category, Careers } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateCountryRequest = {
    name_country: string;
    job_type: string;
    career?: Array<{
        job_name: string;
        job_date?: Date;
    }>;
};

/* =======================
   DATA RESPONSE
======================= */

export type CareerData = {
    id: number;
    job_name: string;
    job_date: Date;
};

export type CategoryData = {
    id_category: number;
    name_category: string;
    job_type: string;
    careers?: CareerData[];   
    created_at?: Date;
    updated_at?: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
    message: string;
    data: T;
};

/* =======================
   MAPPERS
======================= */

function toCareerData(career: Careers): CareerData {
    return {
        id: career.id,
        job_name: career.job_name,
        job_date: career.job_date,
    };
}

export function toCategoryData(
    category: Category & { careers?: Careers[] }
): CategoryData {
    return {
        id_category: category.id,
        name_category: category.name_category,
        job_type: category.job_type,
        careers: category.careers?.map(toCareerData),
        created_at: category.created_at,
        updated_at: category.updated_at,
    };
}

export function toCategoryResponse(
    category: Category & { careers?: Careers[] },
    message: string
): ApiResponse<CategoryData> {
    return {
        message,
        data: toCategoryData(category),
    };
}

export function toModelListResponse(
    categories: (Category & { careers?: Careers[] })[],
    message: string
): ApiResponse<CategoryData[]> {
    return {
        message,
        data: categories.map(toCategoryData),
    };
}
