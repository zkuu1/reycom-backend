/* =======================
   PRISMA TYPES
======================= */
import type {
  Company,
  Country,
  BranchCompany,
} from "../../generated/prisma/client.js";

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* =======================
   REQUEST MODELS
======================= */

export type CreateBranchCompanyRequest = {
  name_branch: string;
  street_address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export type CreateCompanyRequest = {
  name_company: string;
  countryId: number;
  branches?: CreateBranchCompanyRequest[];
};

/* =======================
   DATA RESPONSE MODELS
======================= */

export type BranchCompanyData = {
  id: number;
  name_branch: string;
  street_address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
};

export type CountrySimpleData = {
  id: number;
  name_country: string;
};

export type CompanyData = {
  id: number;
  name_company: string;
  country?: CountrySimpleData;
  branches: BranchCompanyData[];
};

/* =======================
   MAPPERS
======================= */

function toBranchCompanyData(
  branch: BranchCompany
): BranchCompanyData {
  return {
    id: branch.id,
    name_branch: branch.name_branch,
    street_address: branch.street_address,
    phone: branch.phone,
    email: branch.email,
    website: branch.website,
  };
}

function toCountrySimpleData(
  country: Country
): CountrySimpleData {
  return {
    id: country.id,
    name_country: country.name_country,
  };
}

export function toCompanyData(
  company: Company & {
    country?: Country;
    branches?: BranchCompany[];
  }
): CompanyData {
  return {
    id: company.id,
    name_company: company.name_company,
    country: company.country
      ? toCountrySimpleData(company.country)
      : undefined,
    branches: company.branches?.map(toBranchCompanyData) ?? [],
  };
}

/* =======================
   RESPONSE WRAPPERS
======================= */

export function toCompanyResponse(
  company: Company & {
    country?: Country;
    branches?: BranchCompany[];
  },
  message: string
): ApiResponse<CompanyData> {
  return {
    message,
    data: toCompanyData(company),
  };
}

export function toCompanyListResponse(
  companies: (Company & {
    country?: Country;
    branches?: BranchCompany[];
  })[],
  message: string
): ApiResponse<CompanyData[]> {
  return {
    message,
    data: companies.map(toCompanyData),
  };
}

/* =======================
   GENERIC MODEL LIST RESPONSE
======================= */

export function toModelListResponse<T, U>(
  items: T[],
  message: string,
  mapper: (item: T) => U
): ApiResponse<U[]> {
  return {
    message,
    data: items.map(mapper),
  };
}
