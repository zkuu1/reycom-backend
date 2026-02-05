import { Hono } from "hono";
import withPrisma from "../../lib/prisma.js";
import { CareerService } from "../../services/carrer/carrer-service.js";
import { HTTPException } from "hono/http-exception";
import type { ContextWithPrisma } from "../../types/context.js";
import { carrerValidation } from "../../validations/career/carrer-validation.js";
import {safeJson} from '../../helpers/safeJson.js';

export const CareerController = new Hono<ContextWithPrisma>();

// ===============================
// CREATE CAREER
// ===============================
CareerController.post("/career", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const raw = await safeJson(c);

  const validated = carrerValidation.CREATE.parse(raw);

  const response = await CareerService.CreateCareer(prisma, {
    job_name: validated.jobName,
    categoryId: validated.categoryId, 
  });

  return c.json(response, 201);
});


// ===============================
// GET ALL CAREERS
// ===============================
CareerController.get("/career", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const response = await CareerService.GetAllCareers(prisma);
  return c.json(response, 200);
});

// ===============================
// GET CAREER BY ID
// ===============================
CareerController.get("/career/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const id = Number(c.req.param("id"));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: "Invalid career id" });
  }

  const response = await CareerService.GetCareerById(prisma, id);
  return c.json(response, 200);
});

// ===============================
// UPDATE CAREER
// ===============================
CareerController.patch('/career/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid career id' });
  }

  const raw = await safeJson(c);
  const validated = carrerValidation.UPDATE.parse(raw);

  const response = await CareerService.UpdateCareerById(prisma, id, {
    job_name: validated.jobName,
    categoryId: validated.categoryId,
  });

  return c.json(response, 200);
});


// ===============================
// DELETE CAREER
// ===============================
CareerController.delete("/career/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const id = Number(c.req.param("id"));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: "Invalid career id" });
  }

  const response = await CareerService.DeleteCareerById(prisma, id);
  return c.json(response, 200);
});
