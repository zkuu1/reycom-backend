import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { AdminService } from '../../services/admin/admin-service.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { adminValidation } from '../../validations/admin/admin-validation.js';
import { HTTPException } from 'hono/http-exception';
import {safeJson} from '../../helpers/safeJson.js';

import type { AppContext } from '../../types/context.js';

export const AdminController = new Hono<AppContext>();

AdminController.post('/admin', withPrisma, async (c) => {
  const prisma = c.get('prisma');

  const raw = await safeJson(c);
  const validated = adminValidation.CREATE.parse(raw);

  const response = await AdminService.CreateAdmin(prisma, {
    name_admin: validated.nameAdmin,
    email: validated.emailAdmin,
    password: validated.passwordAdmin,
  });
  return c.json(response, 201);
});

AdminController.get('/admin', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');

  const response = await AdminService.GetAllAdmins(prisma);
  return c.json(response, 200);
});

AdminController.get('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid admin id' });
  }

  const response = await AdminService.GetAdminById(prisma, id);
  return c.json(response, 200);
});

AdminController.delete('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid admin id' });
  }

  const response = await AdminService.DeleteAdminById(prisma, id);
  return c.json(response, 200);
});

AdminController.patch('/admin/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid admin id' });
  }

  const raw = await safeJson(c);
  const validated = adminValidation.UPDATE.parse(raw);

  if (Object.keys(validated).length === 0) {
    throw new HTTPException(400, {
      message: 'Minimum one field is required to update admin',
    });
  }

  const updateData: any = {};
  if (validated.nameAdmin !== undefined) updateData.name_admin = validated.nameAdmin;
  if (validated.emailAdmin !== undefined) updateData.email = validated.emailAdmin;
  if (validated.passwordAdmin !== undefined) updateData.password = validated.passwordAdmin;

  const response = await AdminService.UpdateAdminById(prisma, id, updateData);
  return c.json(response, 200);
});

AdminController.post('/admin/login', withPrisma, async (c) => {
  const prisma = c.get('prisma');

  const raw = await safeJson(c);
  const validated = adminValidation.LOGIN.parse(raw);

  const response = await AdminService.LoginAdmin(prisma, {
    name_admin: validated.nameAdmin,
    password: validated.passwordAdmin,
  });
  return c.json(response, 200);
});

AdminController.post(
  '/admin/logout',
  authAdminMiddleware,
  withPrisma,
  async (c) => {
    const prisma = c.get('prisma');
    const admin = c.get('admin');

    if (!admin) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }

    const response = await AdminService.LogoutAdmin(prisma, admin.id);
    return c.json(response, 200);
  },
);
