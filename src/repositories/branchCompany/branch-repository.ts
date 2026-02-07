import { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export class BranchRepository {
    
    static async createBranch(
    prisma: PrismaClient,
    data: Prisma.BranchCompanyCreateInput
    ) {
        return prisma.branchCompany.create({
            data
        })
    }

    static async getAllBranches(
        prisma: PrismaClient
    ) {
        return prisma.branchCompany.findMany()
    }

    static async findBranchById(
        prisma: PrismaClient,
        id: Number
    ) {
        return prisma.branchCompany.findUnique({
            where: {id: Number(id)}
        })}

    static async updateBranchById(
        prisma: PrismaClient,
        id: Number,
        data: Prisma.BranchCompanyUpdateInput
    ) {
        return prisma.branchCompany.update({
            where: {id: Number(id)},
            data: {
                ...data
            }
        })
    }

    static async deleteBranchById(
        prisma: PrismaClient,
        id: Number
    ) {
        return prisma.branchCompany.delete({
            where: {id: Number(id)}
    })
    }

    }
