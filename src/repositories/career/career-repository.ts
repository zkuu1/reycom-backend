import { PrismaClient, Prisma } from "../../generated/prisma/client.js";

export class CareerRepository {
  
   static async countByNameCareer(
        prisma: PrismaClient,
        job_name: string,
    ) {
        return prisma.careers.count({
            where: { job_name },
     });
}

  static createCareer(
    prisma: PrismaClient,
    data: Prisma.CareersCreateInput
  ) {
    return prisma.careers.create({ data });
  }

  static async findCareerByName(
    prisma: PrismaClient,
    job_name: string,
  ) {
    return prisma.careers.findFirst({
      where: { job_name },
    });
  }

  static async getAllCareerss(
    prisma: PrismaClient,
  ) {
    return prisma.careers.findMany();
  }

  static async findCareerById(
     prisma: PrismaClient,
     id: number
  ) {
    return prisma.careers.findUnique({
      where: {id}
    })
  }

  static async updateCareerById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.CareersUpdateInput
  ) {
    return prisma.careers.update({
      where: {id},
      data
    })
  }

  static async deleteCareerById(
    prisma: PrismaClient,
    id: number
  ) {
    return prisma.careers.delete({
      where: {id}
    })
  }
  
  
}

    