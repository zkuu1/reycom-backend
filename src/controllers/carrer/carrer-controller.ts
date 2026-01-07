import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { CarrerService } from '../../services/carrer/carrer-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const CareerController = new Hono<ContextWithPrisma>();

CareerController.post('/career', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const request = await c.req.json();

    const response = await CarrerService.CreateCarrer(prisma, request);
    return c.json(response, 201);
})

CareerController.get('/career', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await CarrerService.GetAllCarrer(prisma);
    return c.json(response, 200);
})