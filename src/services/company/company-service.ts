import { HTTPException } from 'hono/http-exception';
import type { PrismaClient } from '../../generated/prisma/client.js';
import {
    type CreateCompanyRequest,
    type CompanyData,
    type ApiResponse,
    toCompanyResponse,
    toModelListResponse,
} from '../../models/company/company-model.js';
import { CompanyRepository } from '../../repositories/company/company-repository.js';

export class CompanyService {

// ===============================
// CREATE COUNTRY
// ===============================
static async createCompany(
  prisma: PrismaClient,
  request: CreateCompanyRequest,
): Promise<ApiResponse<CompanyData>> {

  const company = await CompanyRepository.createCompany(prisma, {
    name_company: request.name_company,
    country: {
      connect: {
        id: request.countryId,
      },
    },
    branches: request.branches
      ? {
          create: request.branches,
        }
      : undefined,
  });

  return toCompanyResponse(company, 'Company created successfully');
}
}