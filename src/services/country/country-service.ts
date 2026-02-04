import { HTTPException } from 'hono/http-exception';
import type { PrismaClient } from '../../generated/prisma/client.js';
import {
    type CreateCountryRequest,
    type CountryData,
    type ApiResponse,
    toCountryResponse,
    toModelListResponse,
} from '../../models/country/country-model.js';

import { CountryRepository } from '../../repositories/country/country-repository.js';

export class CountryService {

    static async CreateCountry(
        prisma: PrismaClient,
        request: CreateCountryRequest,
    ) {
        const country = await CountryRepository.createCountry(prisma, {
            name_country: request.name_country,
        });
        return toCountryResponse(country, "Country created successfully");
    }

    static async getAllCountries(
        prisma: PrismaClient,
    ): Promise<ApiResponse<CountryData[]>> {
        const countries = await CountryRepository.getAllCountries(prisma);
        return toModelListResponse(countries, "Countries retrieved successfully");
    }

    static async getCountryById(
        prisma: PrismaClient,
        id: Number,
    ): Promise<ApiResponse<CountryData>> {
        const country = await CountryRepository.findCountryById(prisma, id);
        if (!country) {
            throw new HTTPException(404, {
                message: 'Country not found',
            });
        }
        return toCountryResponse(country, "Country retrieved successfully");
    }

    static async updateCountryById(
        prisma: PrismaClient,
        id: Number,
        request: Partial<CreateCountryRequest>,
    ): Promise<ApiResponse<CountryData>> {
        const existing = await CountryRepository.findCountryById(prisma, id);
        if (!existing) {
            throw new HTTPException(404, {
                message: 'Country not found',
            });
        }

        const updated = await CountryRepository.updateCountryById(prisma, id, request)
        return toCountryResponse(updated, "Country updated successfully");
    }

    static async deleteCountryById(
        prisma: PrismaClient,
        id: Number,
    ): Promise<ApiResponse<null>> {
        const existing = await CountryRepository.findCountryById(prisma, id);
        if (!existing) {
            throw new HTTPException(404, {
                message: 'Country not found',
            });
        }
        await CountryRepository.deleteCountryById(prisma, id);
        return {
            message: "Country deleted successfully",
            data: null,
        };
    }
}