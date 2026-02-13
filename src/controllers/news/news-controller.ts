import { Hono } from "hono";
import withPrisma from "../../lib/prisma.js";
import { authAdminMiddleware } from "../../middlewares/middleware.js";
import { NewsService } from "../../services/news/news-service.js";
import type { ContextWithPrisma } from "../../types/context.js";
import { NewsValidation } from "../../validations/news/news-validation.js";
import {safeJson} from '../../helpers/safeJson.js';
import { HTTPException } from "hono/http-exception";

export const NewsController = new Hono<ContextWithPrisma>();

NewsController.get("/news", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const response = await NewsService.getAllNews(prisma);
  return c.json(response, 200);
});

NewsController.get("/news/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const id_news = Number(c.req.param("id"));
  const response = await NewsService.getNewsById(prisma, id_news);
  return c.json(response, 200);
});

NewsController.post(
  "/news",
  authAdminMiddleware,
  withPrisma,
  async (c) => {

    const prisma = c.get("prisma")
    const body = await c.req.parseBody()

    const title = body["title"] as string
    const content = body["content"] as string
    const mainImage = body["image"] as File | undefined

    if (!title || !content) {
      throw new HTTPException(400, {
        message: "Title and content are required"
      })
    }

    const response = await NewsService.createNewsWithImages(prisma, {
      title,
      content,
      mainImage: mainImage instanceof File ? mainImage : undefined,
      carouselImages: []
    })

    return c.json(response, 201)
  }
)

NewsController.patch(
    "/news/:id",
    authAdminMiddleware,
    withPrisma,
    async (c) => {
      const prisma = c.get("prisma");
      const id_news = Number(c.req.param("id"));
      const request = await c.req.json();

      const parsed = NewsValidation.UPDATE.safeParse(request);
      if (!parsed.success) {
        return c.json(
          { errors: parsed.error.issues.map((e) => e.message) },
          400
        );
      }
      const response = await NewsService.updateNewsById(
        prisma,
        { id: id_news, ...parsed.data }
      );
      return c.json(response, 200);
    }
  );

  NewsController.delete(
    "/news/:id",
    authAdminMiddleware,
    withPrisma,
    async (c) => {
      const prisma = c.get("prisma");
      const id_news = Number(c.req.param("id"));
      const response = await NewsService.deleteNewsById(prisma, id_news);
      return c.json(response, 200);
    }
  )


