import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export class CategoryRepository {

    static async countByNameCategory(
        prisma: PrismaClient,
        name_category: string
    ) {
        return prisma.category.findFirst({
            where: {name_category}
        })
    }

    static async createCategory(
        prisma: PrismaClient,
        data: Prisma.CategoryCreateInput
    ) {
        return prisma.category.create({
            data
        })
    }

    static async findCategoryByName(
        prisma: PrismaClient,
        name_category: string
    ) {
        return prisma.category.findFirst({
            where: {name_category}
        })
    }

    static async getAllCategory(
        prisma: PrismaClient
    ) {
        return prisma.category.findMany()
    }

    static async getAllCategories(
        prisma: PrismaClient
    ) {
        return prisma.category.findMany()
    }

    static async findCategoryById(
        prisma: PrismaClient,
        id: number
    ) {
        return prisma.category.findUnique({
            where: {id}
        })
    }

    static async updateCategoryById(        
        prisma: PrismaClient,
        id: number,
        data: Prisma.CategoryUpdateInput
    ) {
        return prisma.category.update({
            where: {id},
            data
        })
    }

    static async deleteCategoryById(
        prisma: PrismaClient,
        id: number
    ) {
        return prisma.category.delete({
            where: {id}
        })
    }
}