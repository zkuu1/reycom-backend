
import { Prisma, PrismaClient } from "../../generated/prisma/client.js";


export class CountryRepository {
    
    static createCountry(
        prisma: PrismaClient,
        data: Prisma.CountryCreateInput
    ) {
        return prisma.country.create({
            data,
    });
    }

    static getAllCountries(
        prisma: PrismaClient,
    ) {
        return prisma.country.findMany({
            include: {
                companies: {
                    include: {
                        branches: true,
                    },
                },
            },
        });
    }

    static findCountryById(
        prisma: PrismaClient,
        id: Number
    ) {
        return prisma.country.findUnique({
            where: { id: Number(id) }
    });
        
    }

    static updateCountryById(
        prisma: PrismaClient,
        id: Number,
        data: Prisma.CountryUpdateInput
    ) {
        return prisma.country.update({
            where: { id: Number(id) },
            data: {
                ...data
            },
        });
    }

    static deleteCountryById(
        prisma: PrismaClient,
        id: Number
    ) {
        return prisma.country.delete({
            where: { id: Number(id) },
        })
    }
}