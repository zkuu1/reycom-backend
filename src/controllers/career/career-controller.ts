import { Hono } from "hono";
import withPrisma from "../../lib/prisma.js";
import { CareerService } from "../../services/carrer/carrer-service.js";
import { HTTPException } from "hono/http-exception";
import type { ContextWithPrisma } from "../../types/context.js";
import { carrerValidation } from "../../validations/carrer/carrer-validation.js";

export const CareerController = new Hono<ContextWithPrisma>();

async function safeJson(c: any) {
  try {
    return await c.req.json();
  } catch {
    throw new HTTPException(400, {
      message: "Invalid or empty JSON body",
    });
  }
}

// ===============================
// CREATE CAREER
// ===============================
CareerController.post("/career", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const raw = await safeJson(c);

  const validated = carrerValidation.CREATE.parse(raw)

  const response = await CareerService.CreateCareer(prisma, validated)

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
CareerController.patch("/career/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const id = Number(c.req.param("id"));
  const raw = await safeJson(c);

  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: "Invalid career id" });
  }

  if (!raw.job_name && !raw.categoryId) {
    throw new HTTPException(400, {
      message: "Minimum one field is required to update career",
    });
  }

  const response = await CareerService.UpdateCareerById(prisma, id, {
    job_name: raw.job_name,
    categoryId: raw.categoryId,
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
