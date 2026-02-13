import type { PrismaClient } from "../../generated/prisma/client.js";
import { HTTPException } from "hono/http-exception";
import { CareerRepository } from "../../repositories/career/career-repository.js";
import {
  type CareerWithCategoryData,
  type ApiResponse,
  toCareerListResponse,
  toCareerResponse,
} from "../../models/career/career-model.js";

export class CareerService {

  // ===============================
  // CREATE CAREER
  // ===============================
  static async CreateCareer(
  prisma: PrismaClient,
  request: {
    job_name: string;
    categoryId?: number;
  },
): Promise<ApiResponse<CareerWithCategoryData>> {

  const total = await CareerRepository.countByNameCareer(
    prisma,
    request.job_name,
  );

  if (total !== 0) {
    throw new HTTPException(400, {
      message: 'Career with the same name already exists',
    });
  }

  if (request.categoryId !== undefined) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: request.categoryId },
    });

    if (!categoryExists) {
      throw new HTTPException(404, {
        message: 'Category not found',
      });
    }
  }

  const career = await CareerRepository.createCareer(prisma, {
    job_name: request.job_name,
    ...(request.categoryId !== undefined && {
      category: {
        connect: { id: request.categoryId },
      },
    }),
  });

  return toCareerResponse(career, 'Career created successfully');
}


  // ===============================
  // GET ALL CAREERS
  // ===============================
  static async GetAllCareers(
    prisma: PrismaClient,
  ): Promise<ApiResponse<CareerWithCategoryData[]>> {

    const careers = await CareerRepository.findAll(prisma);

    const total = careers.length;
    const page = 1;
    const limit = total;

    return toCareerListResponse(careers, "Get all careers successfully", page, limit, total);
  }

  // ===============================
  // GET CAREER BY ID
  // ===============================
  static async GetCareerById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const career = await CareerRepository.findCareerById(prisma, id);

    if (!career) {
      throw new HTTPException(404, {
        message: "Career not found",
      });
    }

    return toCareerResponse(career, "Get career successfully");
  }

  // ===============================
  // UPDATE CAREER
  // ===============================
  static async UpdateCareerById(
  prisma: PrismaClient,
  id: number,
  request: {
    job_name?: string;
    categoryId?: number | null;
  },
): Promise<ApiResponse<CareerWithCategoryData>> {

  const career = await CareerRepository.findCareerById(prisma, id);

  if (!career) {
    throw new HTTPException(404, { message: 'Career not found' });
  }

  // 🔥 JIKA categoryId ADA → VALIDASI DULU
  if (request.categoryId !== undefined && request.categoryId !== null) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: request.categoryId },
    });

    if (!categoryExists) {
      throw new HTTPException(400, {
        message: 'Category not found',
      });
    }
  }

  const updated = await CareerRepository.updateCareerById(prisma, id, {
    ...(request.job_name && { job_name: request.job_name }),

    ...(request.categoryId !== undefined && {
      category:
        request.categoryId === null
          ? { disconnect: true } // 👈 hapus category
          : { connect: { id: request.categoryId } },
    }),
  });

  return toCareerResponse(updated, 'Career updated successfully');
}


  // ===============================
  // DELETE CAREER
  // ===============================
  static async DeleteCareerById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const existing = await CareerRepository.findCareerById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: "Career not found",
      });
    }

    await CareerRepository.deleteById(prisma, id);

    return toCareerResponse(existing, "Career deleted successfully");
  }
}
