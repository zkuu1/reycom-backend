import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { CategoryService } from '../../services/category/category-service.js';
import { CategoryValidation } from '../../validations/category/category-validation.js';
import { HTTPException } from 'hono/http-exception';
import {safeJson} from '../../helpers/safeJson.js';
import type { ContextWithPrisma } from '../../types/context.js';

// redis
import { redis } from '../../lib/redis.js';

export const CategoryController = new Hono<ContextWithPrisma>();

CategoryController.post('/category', withPrisma, async (c) => {
  const prisma = c.get('prisma');

  const raw = await safeJson(c);
  const validated = CategoryValidation.CREATE.parse(raw);

  const response = await CategoryService.CreateCategory(prisma, validated);
  return c.json(response, 201);
});

CategoryController.get('/category', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const cacheKey = "category:all";
  const ONE_DAY = 60 * 60 * 24;

  const cachedData = await redis.get(cacheKey);
  if (cachedData && typeof cachedData === 'string') {
    return c.json(JSON.parse(cachedData), 200);
  }

  const response = await CategoryService.GetAllCategories(prisma);
  await redis.setex(cacheKey, ONE_DAY, JSON.stringify(response));
  return c.json(response, 200);
});

CategoryController.get('/category/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid category id' });
  }

  const response = await CategoryService.GetCategoryById(prisma, id);
  return c.json(response, 200);
});

CategoryController.patch('/category/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid category id' });
  }

  const raw = await safeJson(c);
  const validated = CategoryValidation.UPDATE.parse(raw);

  if (Object.keys(validated).length === 0) {
    throw new HTTPException(400, {
      message: 'Minimum one field is required to update category',
    });
  }

  const response = await CategoryService.UpdateCategoryById(
    prisma,
    id,
    validated,
  );

  return c.json(response, 200);
});

CategoryController.delete('/category/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid category id' });
  }

  const response = await CategoryService.DeleteCategoryById(prisma, id);
  return c.json(response, 200);
});
