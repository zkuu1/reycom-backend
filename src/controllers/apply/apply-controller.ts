import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { ApplyService } from '../../services/apply/apply-service.js';
import { applyValidation } from '../../validations/apply/apply-validation.js';
import { HTTPException } from 'hono/http-exception';
import {safeJson} from '../../helpers/safeJson.js';
import type { ContextWithPrisma } from '../../types/context.js';

export const ApplyController = new Hono<ContextWithPrisma>();

// ===============================
// GET ALL APPLY
// ===============================
ApplyController.get('/apply', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const response = await ApplyService.GetAllApplications(prisma);
  return c.json(response, 200);
});

// ===============================
// GET APPLY BY ID
// ===============================
ApplyController.get('/apply/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid apply id' });
  }

  const response = await ApplyService.GetApplicationById(prisma, id);
  return c.json(response, 200);
});

// ===============================
// GET APPLY BY NAME
// ===============================
ApplyController.get('/apply/name/:name', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const name_apply = c.req.param('name');
  const response = await ApplyService.FindApplicationByName(prisma, name_apply);
  return c.json(response, 200);
});

// ===============================
// CREATE APPLY
// ===============================
ApplyController.post('/apply', withPrisma, async (c) => {
  const prisma = c.get('prisma');

  const raw = await safeJson(c);
  const validated = applyValidation.CREATE.parse(raw);

  const response = await ApplyService.CreateApplication(prisma, validated);
  return c.json(response, 201);
});

// ===============================
// UPDATE APPLY
// ===============================
ApplyController.patch('/apply/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid apply id' });
  }

  const raw = await safeJson(c);
  const validated = applyValidation.UPDATE.parse(raw);

  if (Object.keys(validated).length === 0) {
    throw new HTTPException(400, {
      message: 'Minimum one field is required to update apply',
    });
  }

  const response = await ApplyService.UpdateApplicationById(
    prisma,
    id,
    validated,
  );

  return c.json(response, 200);
});

// ===============================
// DELETE APPLY
// ===============================
ApplyController.delete('/apply/:id', authAdminMiddleware, withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid apply id' });
  }

  const response = await ApplyService.DeleteApplicationById(prisma, id);
  return c.json(response, 200);
});
