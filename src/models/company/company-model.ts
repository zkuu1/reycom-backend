// =====================================
// API RESPONSE GENERIC
// =====================================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// =====================================
// BRANCH DTO
// =====================================
export interface CreateBranchCompanyRequest {
  nameBranch: string;
}

export interface BranchCompanyData {
  id: number;
  nameBranch: string;
  createdAt: Date;
  updatedAt: Date;
}

// =====================================
// COMPANY DTO (REQUEST)
// =====================================
export type CreateCompanyRequest = {
  name_company: string;
  countryId?: number;
  branches?: CreateBranchCompanyRequest[];
}

// =====================================
// COMPANY DTO (RESPONSE DATA)
// =====================================
export interface CompanyData {
  id: number;
  nameCompany: string;

  country: {
    id: number;
    nameCountry: string;
    createdAt: Date;
    updatedAt: Date;
  };

  branches: BranchCompanyData[];

  createdAt: Date;
  updatedAt: Date;
}

// =====================================
// MAPPER: BRANCH ➜ RESPONSE
// =====================================
export function toBranchData(branch: any): BranchCompanyData {
  return {
    id: branch.id,
    nameBranch: branch.name_branch,
    createdAt: branch.createdAt,
    updatedAt: branch.updatedAt,
  };
}

// =====================================
// MAPPER: COMPANY ➜ RESPONSE
// =====================================
export function toCompanyData(company: any): CompanyData {
  return {
    id: company.id,
    nameCompany: company.name_company,

    country: {
      id: company.country.id,
      nameCountry: company.country.name_country,
      createdAt: company.country.createdAt,
      updatedAt: company.country.updatedAt,
    },

    branches: company.branches?.map(toBranchData) ?? [],

    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

// =====================================
// RESPONSE: SINGLE COMPANY
// =====================================
export function toCompanyResponse(
  company: any,
  message: string
): ApiResponse<CompanyData> {
  return {
    success: true,
    message,
    data: toCompanyData(company),
  };
}

// =====================================
// RESPONSE: LIST GENERIC
// =====================================
export function toModelListResponse<T, R>(
  models: T[],
  message: string,
  mapper: (item: T) => R
): ApiResponse<R[]> {
  return {
    success: true,
    message,
    data: models.map(mapper),
  };
}
