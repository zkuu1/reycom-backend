import type { Category } from "../../generated/prisma/client.js";



/* =======================
   REQUEST
======================= */
export type CreateCategoryRequest = {
    name_category: string;
    job_type: String
};

/* =======================
   DATA RESPONSE
======================= */
export type CategoryData = {
    id_category: number;
    name_category: string;
    job_type: String
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
    message: string;
    data: T;
};

export function toCategoryData(
    category: Category
): CategoryData {
    return {
        id_category: category.id,
        name_category: category.name_category,
        job_type: category.job_type,
    };
}

export function toCategoryResponse(
    category: Category,
    message: string
): ApiResponse<CategoryData> {
    return {
        message,
        data: toCategoryData(category),
    };
}

export function toModelListResponse(
    category: Category[],
    message: string
): ApiResponse<CategoryData[]> {
    return {
        message,
        data: category.map(toCategoryData),
    };
}
