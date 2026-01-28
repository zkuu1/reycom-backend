import { HTTPException } from 'hono/http-exception';
import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateCategoryRequest,
  type CategoryData,
  type ApiResponse,
  toCategoryResponse,
  toModelListResponse,
} from '../../models/category/category-model.js';
import { CategoryRepository } from '../../repositories/category/category-repository.js';

export class CategoryService {

  // ===============================
  // CREATE CATEGORY
  // ===============================
  static async CreateCategory(
    prisma: PrismaClient,
    request: CreateCategoryRequest,
  ): Promise<ApiResponse<CategoryData>> {

    // cek duplicate name
    const existing = await CategoryRepository.countByNameCategory(
      prisma,
      request.name_category,
    );

    if (existing) {
      throw new HTTPException(400, {
        message: 'Category with the same name already exists',
      });
    }

    const { career, ...categoryData } = request;

    const category = await CategoryRepository.createCategory(prisma, {
      ...categoryData,
      ...(career && career.length > 0 && {
        careers: {
          create: career.map((c) => ({
            job_name: c.job_name,
            job_date: c.job_date,
          })),
        },
      }),
    });

    return toCategoryResponse(category, 'Category created successfully');
  }

  // ===============================
  // GET ALL CATEGORIES
  // ===============================
  static async GetAllCategories(
    prisma: PrismaClient,
  ): Promise<ApiResponse<CategoryData[]>> {

    const categories = await CategoryRepository.getAllCategories(prisma);

    return toModelListResponse(
      categories,
      'Get all categories successfully',
    );
  }

  // ===============================
  // GET CATEGORY BY ID
  // ===============================
  static async GetCategoryById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CategoryData>> {

    const category = await CategoryRepository.findCategoryById(prisma, id);

    if (!category) {
      throw new HTTPException(404, {
        message: 'Category with this id not found',
      });
    }

    return toCategoryResponse(category, 'Get category successfully');
  }

  // ===============================
  // UPDATE CATEGORY
  // ===============================
  static async UpdateCategoryById(
    prisma: PrismaClient,
    id: number,
    request: Partial<CreateCategoryRequest>,
  ): Promise<ApiResponse<CategoryData>> {

    const existing = await CategoryRepository.findCategoryById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: 'Category not found',
      });
    }

    // optional: prevent duplicate name on update
    if (request.name_category) {
      const duplicate = await CategoryRepository.findCategoryByName(
        prisma,
        request.name_category,
      );

      if (duplicate && duplicate.id !== id) {
        throw new HTTPException(400, {
          message: 'Category name already used by another category',
        });
      }
    }

    const updated = await CategoryRepository.updateCategoryById(
      prisma,
      id,
      request,
    );

    return toCategoryResponse(updated, 'Category updated successfully');
  }

  // ===============================
  // DELETE CATEGORY
  // ===============================
  static async DeleteCategoryById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<CategoryData>> {

    const existing = await CategoryRepository.findCategoryById(prisma, id);

    if (!existing) {
      throw new HTTPException(404, {
        message: 'Category not found',
      });
    }

    const deleted = await CategoryRepository.deleteCategoryById(prisma, id);

    return toCategoryResponse(deleted, 'Category deleted successfully');
  }
}
