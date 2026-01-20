import { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export class CarouselRepository {
  static async addCarouselImage(
    prisma: PrismaClient,
    newsId: number,
    url: string,
    publicId: string
  ) {
    return prisma.newsCarousel.create({
      data: {
        newsId,
        image_url: url,
        public_id: publicId,
      },
    });
  }

  static async findCarouselById(
    prisma: PrismaClient,
    id: number
  ) {
    return prisma.newsCarousel.findUnique({
      where: {id}
    })
  }

  static async findCarouselByPublicId(
    prisma: PrismaClient,
    public_id: string
  ) {
    return prisma.newsCarousel.findFirst({
      where: {public_id}
    })
  }

  static async findCarouselByNewsId(
    prisma: PrismaClient,
    newsId: number
  ) {
    return prisma.newsCarousel.findFirst({
      where: {newsId}
    })
  }

  static async getAllCarousel(
    prisma: PrismaClient
  ) {
    return prisma.newsCarousel.findMany()
 }

  static async updateCarouselById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.NewsCarouselUpdateInput
  ) {
    return prisma.newsCarousel.update({
      where: {id},
      data
    })
  }

  static async deleteCarouselById(
    prisma:PrismaClient,
    id: number
  ) {
    return prisma.newsCarousel.delete({
      where: {id}
    })
  }
// static async updateCarouselById(
//     prisma: PrismaClient, 
//     carouseld: String
// ) {
//   return prisma.
// }
}