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
        message: "Career with the same name already exists",
      });
    }

    const career = await CareerRepository.createCareer(prisma, {
      job_name: request.job_name,
      ...(request.categoryId && {
        category: {
          connect: { id: request.categoryId },
        },
      }),
    });

    return toCareerResponse(career, "Career created successfully");
  }

  // ===============================
  // GET ALL CAREERS
  // ===============================
  static async GetAllCareers(
    prisma: PrismaClient,
  ): Promise<ApiResponse<CareerWithCategoryData[]>> {

    const careers = await CareerRepository.findAll(prisma);

    return toCareerListResponse(careers, "Get all careers successfully");
  }

  // ===============================
  // GET CAREER BY ID
  // ===============================
  static async GetCareerById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const career = await CareerRepository.findById(prisma, id);

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
      categoryId?: number;
    },
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const existing = await CareerRepository.findById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: "Career not found",
      });
    }

    if (request.job_name) {
      const duplicate = await CareerRepository.countByNameCareer(
        prisma,
        request.job_name,
      );

      if (duplicate > 0 && request.job_name !== existing.job_name) {
        throw new HTTPException(400, {
          message: "Career name already exists",
        });
      }
    }

    const updated = await CareerRepository.updateById(prisma, id, {
      ...(request.job_name && { job_name: request.job_name }),
      ...(request.categoryId && {
        category: {
          connect: { id: request.categoryId },
        },
      }),
    });

    return toCareerResponse(updated, "Career updated successfully");
  }

  // ===============================
  // DELETE CAREER
  // ===============================
  static async DeleteCareerById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CareerWithCategoryData>> {

    const existing = await CareerRepository.findById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: "Career not found",
      });
    }

    await CareerRepository.deleteById(prisma, id);

    return toCareerResponse(existing, "Career deleted successfully");
  }
}
