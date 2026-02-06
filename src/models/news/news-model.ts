import type {
  News,
  NewsCarousel,
} from "../../generated/prisma/client.js"

//
// =====================================
// API RESPONSE GENERIC
// =====================================
//

export interface ApiResponse<T, M = unknown> {
  success: boolean
  message: string
  data: T
  meta?: M
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
// REQUEST DTO
// =====================================
//

export type CreateNewsRequest = {
  title: string
  content: string
}

//
// =====================================
// RESPONSE DATA DTO
// =====================================
//

export type NewsCarouselData = {
  id: number
  imageCarousel: string
  imageCarouselPublicId: string
  createdAt: Date
  updatedAt: Date
}

export type NewsData = {
  id: number
  title: string
  content: string
  imageNews?: string | null
  imageNewsPublicId?: string | null
  isArchived?: boolean
  carousels: NewsCarouselData[]
  createdAt: Date
  updatedAt: Date
}

//
// =====================================
// MAPPERS
// =====================================
//

function toNewsCarouselData(
  carousel: NewsCarousel
): NewsCarouselData {
  return {
    id: carousel.id,
    imageCarousel: carousel.image_url,
    imageCarouselPublicId: carousel.public_id,
    createdAt: carousel.createdAt,
    updatedAt: carousel.updatedAt,
  }
}

export function toNewsData(
  news: News & { carousels?: NewsCarousel[] }
): NewsData {
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    imageNews: news.image_news,
    imageNewsPublicId: news.image_news_public_id,
    isArchived: news.is_archived,
    carousels: news.carousels?.map(toNewsCarouselData) ?? [],
    createdAt: news.createdAt,
    updatedAt: news.updatedAt,
  }
}

//
// =====================================
// RESPONSE WRAPPERS
// =====================================
//

export function toNewsResponse(
  news: News & { carousels?: NewsCarousel[] },
  message: string
): ApiResponse<NewsData> {
  return {
    success: true,
    message,
    data: toNewsData(news),
  }
}

export function toNewsListResponse(
  items: (News & { carousels?: NewsCarousel[] })[],
  message: string,
  page: number,
  limit: number,
  total: number
): ApiResponse<NewsData[], PaginationMeta> {
  return {
    success: true,
    message,
    data: items.map(toNewsData),
    meta: buildPaginationMeta(page, limit, total),
  }
}
