import type { NewsCarousel } from "../../generated/prisma/client.js";
import  {
 type PaginationMeta,
   buildPaginationMeta
} from "../../types/pagination.js"

/* =======================
   DATA RESPONSE
======================= */
export type CarouselData = {
  id: number;
  imageCarousel: string;
  imageCarouselPublicId: string;
  createdAt: Date;
  updatedAt: Date;
};

/* =======================
   API RESPONSE WRAPPER
======================= */
export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* =======================
   MAPPER
======================= */
export function toCarouselData(carousel: NewsCarousel): CarouselData {
  return {
    id: carousel.id,
    imageCarousel: carousel.image_url,
    imageCarouselPublicId: carousel.public_id,
    createdAt: carousel.createdAt,
    updatedAt: carousel.updatedAt,
  };
}

/* =======================
   RESPONSE WRAPPER
======================= */
export function toAllCarouselResponse(
  carousels: NewsCarousel[],
  message: string
): ApiResponse<CarouselData[]> {
  return {
    message,
    data: carousels.map(toCarouselData),
  };
}

export function toCarouselResponse(
  carousel: NewsCarousel,
  message: string,
): ApiResponse<CarouselData> {
  return {
    message,
    data: toCarouselData(carousel),
  };
}

