import { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export class CompanyRepository {

    static async createCompany(
    prisma: PrismaClient,
    data: Prisma.CompanyCreateInput
    ) {
    return prisma.company.create({
        data,
        include: {
        country: true,
        branches: true,
        },
    });
    }

    static getAllCompanies(
        prisma: PrismaClient
    ) {
        return prisma.company.findMany({
            include: {
                country:true,
                branches: true
            }
        })
    }

    static findCountryById(
        prisma: PrismaClient,
        id: Number
    ) {
        return prisma.company.findUnique({
            where: {id: Number(id)}
        })
    }

    static updateCompanyById(
        prisma: PrismaClient,
        id: Number,
        data: Prisma.CompanyUpdateInput
    ) {
        return prisma.company.update({
            where: {id: Number(id)},
            data: {
                ...data
            }
        })
    }

    static deleteCompanyById(
        prisma: PrismaClient,
        id: Number
    ) {
        return prisma.company.delete({
            where: {id: Number(id)}
        })
    }
}