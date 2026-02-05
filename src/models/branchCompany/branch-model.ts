// =====================================
// API RESPONSE GENERIC
// =====================================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// =====================================
// PRISMA TYPE
// =====================================
import type { BranchCompany } from "../../generated/prisma/client.js";


// =====================================
// REQUEST DTO
// =====================================

export interface CreateBranchCompanyRequest {
  companyId: number;
  nameBranch: string;
  streetAddress?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface UpdateBranchCompanyRequest {
  nameBranch?: string;
  streetAddress?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface CreateBranchRequest {
  nameBranch: string;
  streetAddress?: string;
  company: { connect: { id: number } };
  phone?: string;
  email?: string;
  website?: string;
}


// =====================================
// RESPONSE DTO
// =====================================

export interface BranchCompanyData {
  id: number;
  companyId: number;
  nameBranch: string;
  streetAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  createdAt: Date;
  updatedAt: Date;
}


// =====================================
// MAPPER: PRISMA ➜ DTO
// =====================================

export function toBranchCompanyData(
  branch: BranchCompany
): BranchCompanyData {
  return {
    id: branch.id,
    companyId: branch.companyId,
    nameBranch: branch.name_branch,          
    streetAddress: branch.street_address,
    phone: branch.phone,
    email: branch.email,
    website: branch.website,
    createdAt: branch.createdAt,
    updatedAt: branch.updatedAt,
  };
}


// =====================================
// RESPONSE: SINGLE
// =====================================

export function toBranchResponse(
  branch: BranchCompany,
  message: string
): ApiResponse<BranchCompanyData> {
  return {
    success: true,
    message,
    data: toBranchCompanyData(branch),
  };
}


// =====================================
// RESPONSE: LIST
// =====================================

export function toBranchListResponse(
  branches: BranchCompany[],
  message: string
): ApiResponse<BranchCompanyData[]> {
  return {
    success: true,
    message,
    data: branches.map(toBranchCompanyData),
  };
}
