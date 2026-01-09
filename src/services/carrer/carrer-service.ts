import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateCareerRequest,
  type CareerData,
  type ApiResponse,
  toCareerResponse,
  toCareerListResponse,
} from '../../models/carrer/carrer-model.js';
import { carrerValidation } from '../../validations/carrer/carrer-validation.js';
import { HTTPException } from 'hono/http-exception';

export class CarrerService {

  // ===============================
  // CREATE CAREER
  // ===============================
  static async CreateCareer(
    prisma: PrismaClient,
    request: CreateCareerRequest,
  ): Promise<ApiResponse<CareerData>> {

    const validatedRequest = carrerValidation.CREATE.parse(request);

    const career = await prisma.careers.create({
      data: validatedRequest,
    });

    return toCareerResponse(
      career,
      'Career created successfully'
    );
  }

  // ===============================
  // GET ALL CAREERS
  // ===============================
  static async GetAllCareers(
    prisma: PrismaClient,
  ): Promise<ApiResponse<CareerData[]>> {

    const careers = await prisma.careers.findMany();

    return toCareerListResponse(
      careers,
      'Get all careers successfully'
    );
  }

  // ===============================
  // GET CARRER BY ID
  // ===============================
  static async GetCareerById(
    prisma: PrismaClient,
    id_career: number,
  ): Promise<ApiResponse<CareerData>> {
    const career = await prisma.careers.findUnique({
      where: { id: id_career },
    });
    if (!career) {
      throw new HTTPException(404, {
        message: 'Career not found',
      });
    }
    return toCareerResponse(
      career,
      'Get career successfully'
    );
  }

  // ===============================
  // UPDATE CAREER
  // ===============================
  static async UpdateCareerById(
    prisma: PrismaClient,
    id_career: number,
    request: CreateCareerRequest,
  ): Promise<ApiResponse<CareerData>> {

    const validatedRequest = carrerValidation.CREATE.parse(request);

    const existingCareer = await prisma.careers.findUnique({
      where: { id: id_career },
    });

    if (!existingCareer) {
      throw new HTTPException(404, {
        message: 'Career not found',
      });
    }

    const career = await prisma.careers.update({
      where: { id: id_career },
      data: validatedRequest,
    });

    return toCareerResponse(
      career,
      'Career updated successfully'
    );
  }

  // ===============================
  // DELETE CAREER
  // ===============================
  static async DeleteCareerById(
    prisma: PrismaClient,
    id_career: number,
  ): Promise<ApiResponse<CareerData>> {

    const career = await prisma.careers.findUnique({
      where: { id: id_career },
    });

    if (!career) {
      throw new HTTPException(404, {
        message: 'Career not found',
      });
    }

    await prisma.careers.delete({
      where: { id: id_career },
    });

    return toCareerResponse(
      career,
      'Career deleted successfully'
    );
  }
}
