import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { ApplyService } from '../../services/apply/apply-service.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const ApplyController = new Hono<ContextWithPrisma>();

ApplyController.get('/apply', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await ApplyService.GetAllApply(prisma);
    return c.json(response, 200);
});

ApplyController.post('/apply', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const request = await c.req.json();
    const response = await ApplyService.CreateApply(prisma, request);
    return c.json(response, 201);
})

ApplyController.patch('/apply/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_apply = Number(c.req.param('id'));
    const request = await c.req.json();
    const response = await ApplyService.UpdateApplyById(prisma, id_apply, request);
    return c.json(response, 200);
})

ApplyController.delete('/apply/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_apply = Number(c.req.param('id'));
    const response = await ApplyService.DeleteApplyById(prisma, id_apply);
    return c.json(response, 200);
})