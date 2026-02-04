import type { BranchCompany, Company, Country } from "../../generated/prisma/client.js"


/* =======================
   REQUEST
======================= */
export type CreateCountryRequest = {
  name_country: string;
};


/* =======================
   DATA RESPONSE
======================= */

export type BranchCompanyData = {
  id: number;
  name_branch: string;
  street_address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
};

export type CompanyData = {
  id: number;
  name_company: string;
  branches: BranchCompanyData[];
};

export type CountryData = {
  id: number;
  name_country: string;
  companies: CompanyData[];
};

/* =======================
   API RESPONSE WRAPPER
======================= */

export type ApiResponse<T> = {
  message: string;
  data: T;
};


/* =======================
   MAPPERS
======================= */

function toBranchCompanyData(branch: BranchCompany): BranchCompanyData {
  return {
    id: branch.id,
    name_branch: branch.name_branch,
    street_address: branch.street_address,
    phone: branch.phone,
    email: branch.email,
    website: branch.website,
  };
}

function toCompanyData(
  company: Company & { branches?: BranchCompany[] }
): CompanyData {
  return {
    id: company.id,
    name_company: company.name_company,
    branches: company.branches?.map(toBranchCompanyData) ?? [],
  };
}

export function toCountryData(
  country: Country & {
    companies?: (Company & { branches?: BranchCompany[] })[];
  }
): CountryData {
  return {
    id: country.id,
    name_country: country.name_country,
    companies: country.companies?.map(toCompanyData) ?? [],
  };
}

/* =======================
   RESPONSE WRAPPERS
======================= */
export function toCountryResponse(
  country: Country & {
    companies?: (Company & { branches?: BranchCompany[] })[];
  },
  message: string
): ApiResponse<CountryData> {
  return {
    message,
    data: toCountryData(country),
  };
}

export function toModelListResponse<T, U>(
  items: T[],
  message: string,  
    mapper: (item: T) => U = (item) => item as unknown as U
): ApiResponse<U[]> {
  return {
    message,
    data: items.map(mapper),
  };
}

