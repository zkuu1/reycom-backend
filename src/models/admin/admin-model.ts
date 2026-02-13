import type { Admin } from "../../generated/prisma/client.js";
import  {
 type PaginationMeta,
   buildPaginationMeta
} from "../../types/pagination.js"

/* =======================
   REQUEST
======================= */
export type CreateAdminRequest = {
    nameAdmin: string;
    emailAdmin: string;
    passwordAdmin: string;
};

export type LoginAdminRequest = {
    nameAdminn: string;
    passwordAdmin: string;
};

export type LogoutAdminRequest = {
    idAdmin: number;
};


/* =======================
   DATA RESPONSE
======================= */
export type AdminData = {
    idAdmin: number;
    nameAdmin: string;
    emailAdmin: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T,  M = unknown> = {
    message: string;
    success: boolean;
    data: T;
    meta?: M;
};

export function toAdminData(
    admin: Admin,
    token?: string
): AdminData {
    return {
        idAdmin: admin.id,
        nameAdmin: admin.name_admin,
        emailAdmin: admin.email,
        token,
        createdAt: admin.created_at,
        updatedAt: admin.updated_at,
    };
}

export function toAdminListResponse(
    applys: Admin[],
    message: string,
    page: number,
    limit: number,
    total: number
): ApiResponse<AdminData[], PaginationMeta> {
    return {
        success: true,
        message,
        data: applys.map((admin) => toAdminData(admin)),
        meta: buildPaginationMeta(page, limit, total),
    };
}

export function toAdminResponse(
    admin: Admin,
    message: string,
    token?: string
): ApiResponse<AdminData> {
    return {
        success: true,
        message,
        data: toAdminData(admin, token),
    };
}
