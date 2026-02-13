import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateApplyRequest,
  type ApplyData,
  type ApiResponse,
  toApplyResponse,
  toApplyListResponse,
} from '../../models/apply/apply-model.js';

import { HTTPException } from 'hono/http-exception';
import { ApplyRepository } from '../../repositories/apply/apply-repository.js';

export class ApplyService {

  static async CreateApplication(
    prisma: PrismaClient,
    request: CreateApplyRequest,
  ): Promise<ApiResponse<ApplyData>> {

    const total = await ApplyRepository.countByNameApplication(
      prisma,
      request.nameApply,
    );

    if (total !== 0) {
      throw new HTTPException(400, {
        message: 'Application with the same name already exists',
      });
    }

    const application = await ApplyRepository.createApplication(
      prisma,
      request,
    );

    return toApplyResponse(
      application,
      'Application created successfully',
    );
  }

 
  static async GetAllApplications(
    prisma: PrismaClient,
  ): Promise<ApiResponse<ApplyData[]>> {

    const applications = await ApplyRepository.getAllApplications(prisma);

    const page = 1;
    const limit = applications.length;
    const total = applications.length;

    return toApplyListResponse(
      applications,
      'Get all applications successfully',
       page,
       limit,
       total,
    );
  }

  static async GetApplicationById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<ApplyData>> {

    const application = await ApplyRepository.findApplicationById(
      prisma,
      id,
    );

    if (!application) {
      throw new HTTPException(404, {
        message: 'Application not found',
      });
    }

    return toApplyResponse(
      application,
      'Get application successfully',
    );
  }


  static async FindApplicationByName(
    prisma: PrismaClient,
    name_apply: string,
  ): Promise<ApiResponse<ApplyData>> {
    const application = await ApplyRepository.findApplicationByName(
      prisma,
      name_apply,
    );

    if (!application) {
      throw new HTTPException(404, {
        message: 'Application not found',
      });
    }
    return toApplyResponse(
      application,
      'Get application successfully',
    );
  }

  static async UpdateApplicationById(
    prisma: PrismaClient,
    id: number,
    request: Partial<CreateApplyRequest>,
  ): Promise<ApiResponse<ApplyData>> {

    const existing = await ApplyRepository.findApplicationById(
      prisma,
      id,
    );

    if (!existing) {
      throw new HTTPException(404, {
        message: 'Application not found',
      });
    }

    if (Object.keys(request).length === 0) {
      throw new HTTPException(400, {
        message: 'Minimum one field is required to update application',
      });
    }

    const updated = await ApplyRepository.updateApplicationById(
      prisma,
      id,
      request,
    );

    return toApplyResponse(
      updated,
      'Application updated successfully',
    );
  }

  static async DeleteApplicationById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<ApplyData>> {

    const existing = await ApplyRepository.findApplicationById(
      prisma,
      id,
    );

    if (!existing) {
      throw new HTTPException(404, {
        message: 'Application not found',
      });
    }

    await ApplyRepository.deleteApplicationById(prisma, id);

    return toApplyResponse(
      existing,
      'Application deleted successfully',
    );
  }
}
