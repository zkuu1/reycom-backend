import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { CategoryService } from '../../services/category/category-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const CategoryController = new Hono<ContextWithPrisma>();

CategoryController.post('/category', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const request = await c.req.json();
    const response = await CategoryService.CreateCategory(prisma, request);
    return c.json(response, 201);
})

CategoryController.get('/category', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await CategoryService.GetAllCategories(prisma);
    return c.json(response, 200);
})

CategoryController.patch('/category/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_category = Number(c.req.param('id'));
    const request = await c.req.json();
})