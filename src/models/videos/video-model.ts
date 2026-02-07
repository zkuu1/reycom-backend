import type { Videos } from "../../generated/prisma/client.js"

//
// =====================================
// REQUEST
// =====================================
//

export type CreateVideosRequest = {
  titleVideo: string
  linkVideo: string
}

//
// =====================================
// RESPONSE DATA
// =====================================
//

export type VideosData = {
  id: number
  titleVideo: string
  linkVideo: string
  createdAt: Date
  updatedAt: Date
}

//
// =====================================
// PAGINATION META
// =====================================
//

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

//
// =====================================
// API RESPONSE
// =====================================
//

export type ApiResponse<T, M = unknown> = {
  success: boolean
  message: string
  data: T
  meta?: M
}

//
// =====================================
// MAPPERS
// =====================================
//

export function toVideosData(video: Videos): VideosData {
  return {
    id: video.id,
    titleVideo: video.title_video,
    linkVideo: video.link_video,
    createdAt: video.created_at,
    updatedAt: video.updated_at, 
  }
}

//
// =====================================
// RESPONSE WRAPPERS
// =====================================
//

export function toVideosResponse(
  video: Videos,
  message: string
): ApiResponse<VideosData> {
  return {
    success: true,
    message,
    data: toVideosData(video),
  }
}

export function toVideosListResponse(
  videos: Videos[],
  message: string,
  page: number,
  limit: number,
  total: number
): ApiResponse<VideosData[], PaginationMeta> {
  return {
    success: true,
    message,
    data: videos.map(toVideosData),
    meta: buildPaginationMeta(page, limit, total),
  }
}