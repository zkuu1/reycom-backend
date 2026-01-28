import type { Careers, Category } from "../../generated/prisma/client.js";

/* =======================
   DATA RESPONSE
======================= */

export type CareerWithCategoryData = {
  id: number;
  job_name: string;
  job_date: Date;
  category?: {
    id_category: number;
    name_category: string;
    job_type: string;
  };
};

/* =======================
   API RESPONSE
======================= */

export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* =======================
   MAPPERS
======================= */

function toCareerWithCategory(
  career: Careers & { category?: Category | null },
): CareerWithCategoryData {
  return {
    id: career.id,
    job_name: career.job_name,
    job_date: career.job_date,
    category: career.category
      ? {
          id_category: career.category.id,
          name_category: career.category.name_category,
          job_type: career.category.job_type,
        }
      : undefined,
  };
}

export function toCareerListResponse(
  careers: (Careers & { category?: Category | null })[],
  message: string,
): ApiResponse<CareerWithCategoryData[]> {
  return {
    message,
    data: careers.map(toCareerWithCategory),
  };
}

export function toCareerResponse(
  career: Careers & { category?: Category | null },
  message: string,
): ApiResponse<CareerWithCategoryData> {
  return {
    message,
    data: toCareerWithCategory(career),
  };
}
