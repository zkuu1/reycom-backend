import { Hono } from "hono";
import withPrisma from "../../lib/prisma.js";
import { CareerService } from "../../services/carrer/carrer-service.js";
import { HTTPException } from "hono/http-exception";
import type { ContextWithPrisma } from "../../types/context.js";
import { carrerValidation } from "../../validations/career/carrer-validation.js";
import {safeJson} from '../../helpers/safeJson.js';

// redis
import { redis } from "../../lib/redis.js";

export const CareerController = new Hono<ContextWithPrisma>();

CareerController.post("/career", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const raw = await safeJson(c);

  const validated = carrerValidation.CREATE.parse(raw);

  const response = await CareerService.CreateCareer(prisma, {
    job_name: validated.jobName,
    categoryId: validated.categoryId, 
  });

  await redis.del("career:all");
  return c.json(response, 201);
});


CareerController.get("/career", withPrisma, async (c) => {
  const cacheKey = "career:all";
  const ONE_DAY = 60 * 60 * 24;

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log(" From Redis");
    c.header("x-cache", "HIT");
    return c.json(cachedData, 200); 
  }

  const prisma = c.get("prisma");
  const response = await CareerService.GetAllCareers(prisma);

  console.log("🐘 From Database");
  c.header("x-cache", "MISS");

  await redis.set(cacheKey, response, { ex: ONE_DAY });

  return c.json(response, 200);
});




CareerController.get("/career/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const id = Number(c.req.param("id"));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: "Invalid career id" });
  }

  const response = await CareerService.GetCareerById(prisma, id);
  return c.json(response, 200);
});


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

  await redis.del("career:all");
  return c.json(response, 200);
});


CareerController.delete("/career/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const id = Number(c.req.param("id"));

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: "Invalid career id" });
  }

  const response = await CareerService.DeleteCareerById(prisma, id);

  await redis.del("career:all");
  return c.json(response, 200);
});
