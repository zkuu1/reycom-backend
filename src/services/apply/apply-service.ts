import { HTTPException } from 'hono/http-exception';
import type { PrismaClient } from '../../generated/prisma/client.js';

import {
  type CreateApplyRequest,
  type ApiResponse,
  type ApplyData,
  toApplyResponse,
  toApplyListResponse,
} from '../../models/apply/apply-model.js';

import { applyValidation } from '../../validations/apply/apply-validation.js';

export class ApplyService {

  // ===============================
  // CREATE APPLY
  // ===============================
    static async CreateApply(
        prisma: PrismaClient,
        request: CreateApplyRequest,
    ): Promise<ApiResponse<ApplyData>> {

        const validatedRequest = applyValidation.CREATE.parse(request);
        const existing = await prisma.applys.findUnique({
        where: { email: validatedRequest.email },
        });

        if (existing) {
        throw new HTTPException(400, {
            message: 'Apply with the same email already exists',
        });
        }

        const apply = await prisma.applys.create({
            data: validatedRequest,
        });

        return toApplyResponse(apply, 'Apply created successfully');
    }

  // ===============================
  // GET ALL APPLY
  // ===============================
    static async GetAllApply(
        prisma: PrismaClient,
    ): Promise<ApiResponse<ApplyData[]>> {

        const applys = await prisma.applys.findMany();

        return toApplyListResponse(
            applys,
            'Get all applys successfully'
        );
    }

  // ===============================
  // GET ALL APPLY BY ID
  // ===============================
    static async GetApplyById(
        prisma: PrismaClient,
        id: number,
    ): Promise<ApiResponse<ApplyData>> {
        const apply = await prisma.applys.findUnique({
            where: { id },
        });
        if (!apply) {
            throw new HTTPException(404, {
                message: 'Apply not found',
            });
        }
        return toApplyResponse(
            apply,
            'Get apply successfully'
        );
    }

  // ===============================
  // UPDATE APPLY BY ID
  // ===============================
    static async UpdateApplyById(
        prisma: PrismaClient,
        id: number,
        request: Partial<CreateApplyRequest>,
    ): Promise<ApiResponse<ApplyData>> {
        const validatedRequest = applyValidation.UPDATE.parse(request);

        const existingApply = await prisma.applys.findUnique({
            where: { id },
        });

        if (!existingApply) {
            throw new HTTPException(404, { message: 'Apply not found' });
        }

        const existing = await prisma.applys.findUnique({
        where: { email: validatedRequest.email },
        });

        if (existing) {
        throw new HTTPException(400, {
            message: 'Apply with the same email already exists',
        });
        }

        const updatedApply = await prisma.applys.update({
            where: { id },
            data: request,
        });

        return toApplyResponse(updatedApply, 'Apply updated successfully');
    }

  // ===============================
  // DELETE APPLY BY ID
  // ===============================
    static async DeleteApplyById(
        prisma: PrismaClient,
        id: number,
    ): Promise<ApiResponse<ApplyData>> {

        const existingApply = await prisma.applys.findUnique({
            where: { id },
        });

        if (!existingApply) {
            throw new HTTPException(404, { message: 'Apply not found' });
        }

        const deletedApply = await prisma.applys.delete({
            where: { id },
        });

        return toApplyResponse(deletedApply, 'Apply deleted successfully');
    }
}