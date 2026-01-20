import type { Videos } from "../../generated/prisma/client.js";

/* =======================
   REQUEST
======================= */
export type CreateVideosRequest = {
    title_video: string,
    link_video: string
}

/* =======================
   DATA RESPONSE
======================= */
export type VideosData = {
    id: number,
    title_video: string
    link_video: string
    created_at: Date
    update_at: Date
}

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
    message: string;
    data: T
}

/* =======================
   MAPPERS
======================= */
export function toVideosData(videos: Videos): VideosData{
    return {
        id: videos.id,
        title_video: videos.title_video,
        link_video: videos.link_video,
        created_at: videos.created_at,
        update_at: videos.created_at
    }
}

/* =======================
   RESPONSE WRAPPERS
======================= */
export function toVideosResponse(
    videos: Videos,
    message: string
): ApiResponse<VideosData> {
    return {
        message,
        data: toVideosData(videos)
    }
}

export function toAllVideosResponse(
    videos: Videos[],
    message: string
): ApiResponse<VideosData[]> {
    return {
        message,
        data: videos.map(toVideosData)
    }
}
