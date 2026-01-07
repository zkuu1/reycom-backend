
import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { AdminService } from '../../services/admin/admin-service.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';

import type { ContextWithPrisma } from '../../types/context.js';

export const AdminController = new Hono<ContextWithPrisma>();

AdminController.post('/admin', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const request = await c.req.json();

  const response = await AdminService.CreateAdmin(prisma, request);
  return c.json(response, 201);
});

AdminController.get('/admin', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const response = await AdminService.GetAllAdmins(prisma);
  return c.json(response, 200);
})

AdminController.delete('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));
  const response = await AdminService.deleteAdminById(prisma, id);
  return c.json(response, 200);
})

AdminController.patch('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));
  const request = await c.req.json();
  const response = await AdminService.updateAdminById(prisma, id, request);
  return c.json(response, 200);
})

AdminController.post('/admin/login', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const request = await c.req.json();
  const response = await AdminService.loginAdmin(prisma, request);
  return c.json(response, 200);
})

AdminController.post('/admin/logout', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number (c.req.param('id'));
  const response = await AdminService.logoutAdmin(prisma, id);
  return c.json(response, 200);
})