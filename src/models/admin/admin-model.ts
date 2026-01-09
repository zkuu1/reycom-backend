import type { Admin } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateAdminRequest = {
    name_admin: string;
    email: string;
    password: string;
};

export type LoginAdminRequest = {
    name_admin: string;
    password: string;
};

export type LogoutAdminRequest = {
    id_admin: number;
};

/* =======================
   DATA RESPONSE
======================= */
export type AdminData = {
    id_admin: number;
    name_admin: string;
    email: string;
    token?: string;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
    message: string;
    data: T;
};

export function toAdminData(
    admin: Admin,
    token?: string
): AdminData {
    return {
        id_admin: admin.id,
        name_admin: admin.name_admin,
        email: admin.email,
        token,
    };
}
export function toAdminListResponse(
    applys: Admin[],
    message: string
): ApiResponse<AdminData[]> {
    return {
        message,
        data: applys.map((admin) => toAdminData(admin)),
    };
}


export function toAdminResponse(
    admin: Admin,
    message: string,
    token?: string
): ApiResponse<AdminData> {
    return {
        message,
        data: toAdminData(admin, token),
    };
}
