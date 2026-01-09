import { HTTPException } from 'hono/http-exception';
import type { PrismaClient } from '../../generated/prisma/client.js';
import {
    type CreateCategoryRequest,
    type CategoryData,
    type ApiResponse,
    toCategoryResponse,
    toModelListResponse,
} from '../../models/category/category-model.js';
import { CategoryValidation } from '../../validations/category/category-validation.js';

export class CategoryService {
    
    // ===============================
    // CREATE CATEGORY
    // ===============================
    static async CreateCategory(
        prisma: PrismaClient,
        request: CreateCategoryRequest,
    ): Promise<ApiResponse<CategoryData>> {
        const validatedRequest = CategoryValidation.CREATE.parse(request);
        const category = await prisma.category.create({
            data: validatedRequest,
        });
        return toCategoryResponse(
            category,
            'Category created successfully'
        );
    }

    // ===============================
    // GET ALL CATEGORIES
    // ===============================
    static async GetAllCategories(
        prisma: PrismaClient,
    ): Promise<ApiResponse<CategoryData[]>> {
        const categories = await prisma.category.findMany();
        return toModelListResponse(
            categories,
            'Get all categories successfully'
        );
    }
    
    // ===============================
    // GET CATEGORY BY ID
    // ===============================
    static async GetCategoryById(
        prisma: PrismaClient,
        id_category: number,
    ): Promise<ApiResponse<CategoryData>> {
        const category = await prisma.category.findUnique({
            where: { id: id_category },
        });
        if (!category) {
            throw new HTTPException(404, {
                message: 'Category not found',
            });
        }
        return toCategoryResponse(
            category,
            'Get category successfully'
        );
    }

    // ===============================
    // UPDATE CATEGORY
    // ===============================
    static async UpdateCategoryById(
        prisma: PrismaClient,
        id_category: number,
        request: CreateCategoryRequest,
    ): Promise<ApiResponse<CategoryData>> {
        const validatedRequest = CategoryValidation.UPDATE.parse(request);  
        const existingCategory = await prisma.category.findUnique({
            where: { id: id_category },
        });
        if (!existingCategory) {
            throw new HTTPException(404, {
                message: 'Category not found',
            });
        }
        const updatedCategory = await prisma.category.update({
            where: { id: id_category },
            data: validatedRequest,
        });
        return toCategoryResponse(
            updatedCategory,
            'Category updated successfully'
        );
    }

    // ===============================
    // DELETE CATEGORY
    // ===============================
    static async DeleteCategoryById(
        prisma: PrismaClient,
        id_category: number,
    ): Promise<ApiResponse<CategoryData>> {
        const existingCategory = await prisma.category.findUnique({
            where: { id: id_category },
        });
        if (!existingCategory) {
            throw new HTTPException(404, {
                message: 'Category not found',
            });
        }
        const deletedCategory = await prisma.category.delete({
            where: { id: id_category },
        });
        return toCategoryResponse(
            deletedCategory,
            'Category deleted successfully'
        );
    }
}