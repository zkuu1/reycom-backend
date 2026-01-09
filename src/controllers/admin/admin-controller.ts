import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { AdminService } from '../../services/admin/admin-service.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';

import type { AppContext } from '../../types/context.js';

export const AdminController = new Hono<AppContext>();


// ===============================
// CREATE ADMIN
// ===============================
AdminController.post('/admin', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const request = await c.req.json();

  const response = await AdminService.CreateAdmin(prisma, request);
  return c.json(response, 201);
});

// ===============================
// GET ALL ADMINS
// ===============================
AdminController.get('/admin', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const response = await AdminService.GetAllAdmins(prisma);
  return c.json(response, 200);
});

// ===============================
// DELETE ADMIN
// ===============================
AdminController.delete('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  const response = await AdminService.DeleteAdminById(prisma, id);
  return c.json(response, 200);
});

// ===============================
// UPDATE ADMIN
// ===============================
AdminController.patch('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));
  const request = await c.req.json();

  const response = await AdminService.UpdateAdminById(prisma, id, request);
  return c.json(response, 200);
});

// ===============================
// LOGIN ADMIN
// ===============================
AdminController.post('/admin/login', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const request = await c.req.json();

  const response = await AdminService.LoginAdmin(prisma, request);
  return c.json(response, 200);
});

// ===============================
// LOGOUT ADMIN (TOKEN BASED)
// ===============================
AdminController.post('/admin/logout', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');

  const admin = c.get('admin');
  if (!admin) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const response = await AdminService.LogoutAdmin(prisma, admin.id);
  return c.json(response, 200);
});
