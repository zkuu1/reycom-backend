import type { PrismaClient, Prisma } from "../../generated/prisma/client.js";

export class CareerRepository {

  static countByNameCareer(
    prisma: PrismaClient,
    job_name: string,
  ) {
    return prisma.careers.count({
      where: { job_name },
    });
  }

  static createCareer(
    prisma: PrismaClient,
    data: Prisma.CareersCreateInput,
  ) {
    return prisma.careers.create({
      data,
      include: {
        category: true,
      },
    });
  }

  static findAll(
    prisma: PrismaClient,
  ) {
    return prisma.careers.findMany({
      include: {
        category: true,
      },
    });
  }

  static findById(
    prisma: PrismaClient,
    id: number,
  ) {
    return prisma.careers.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  static updateById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.CareersUpdateInput,
  ) {
    return prisma.careers.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  static deleteById(
    prisma: PrismaClient,
    id: number,
  ) {
    return prisma.careers.delete({
      where: { id },
    });
  }
}
