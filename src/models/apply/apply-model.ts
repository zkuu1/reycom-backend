import type { Applys } from "../../generated/prisma/client.js";
import  {
 type PaginationMeta,
   buildPaginationMeta
} from "../../types/pagination.js"

/* =======================
   REQUEST
======================= */
export type CreateApplyRequest = {
    nameApply: string;
    emailApply: string;
    phoneNumberApply: string;
    gender: string;
    domicile: string;
    resume: string;
};

/* =======================
   DATA RESPONSE (SINGLE)
======================= */
export type ApplyData = {
    idApply: number;
    nameApply: string;
    emailApply: string;
    phoneNumberApply: string;
    gender: string;
    domicile: string;
    resume: string;
    createdAt?: Date;
    updatedAt?: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T , M = unknown> = {
    success: boolean;
    message: string;
    data: T;
    meta?: M;
};

export function toApplyData(apply: Applys): ApplyData {
    return {
        idApply: apply.id,
        nameApply: apply.name_apply,
        emailApply: apply.email,
        phoneNumberApply: apply.no_hp,
        gender: apply.gender,
        domicile: apply.domicile,
        resume: apply.resume,
        createdAt: apply.created_at,
        updatedAt: apply.updated_at,
    };
}

export function toApplyResponse(
    apply: Applys,
    message: string
): ApiResponse<ApplyData> {
    return {
        success: true,
        message,
        data: toApplyData(apply),
    };
}

export function toApplyListResponse(
    applys: Applys[],
    message: string,
    page: number,
    limit: number,
    total: number
): ApiResponse<ApplyData[], PaginationMeta>  {
    return {
        success: true,
        message,
        data: applys.map(toApplyData),
        meta: buildPaginationMeta(page, limit, total)
    };
}
