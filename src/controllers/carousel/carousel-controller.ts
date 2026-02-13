import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { CarouselNewsService } from '../../services/carousel/carousel-service.js';
import type { ContextWithPrisma } from '../../types/context.js';
import { toAllCarouselResponse, toCarouselResponse } from '../../models/carousel/carousel-model.js';
import { HTTPException } from 'hono/http-exception';
import { Prisma } from '../../generated/prisma/client.js';

export const CarouselController = new Hono<ContextWithPrisma>();

CarouselController.get('/news/carousel', withPrisma, async (c) => {
    const prisma = c.get('prisma');
        const response = await CarouselNewsService.getAllCarousel(prisma);
        return c.json(toAllCarouselResponse(
            response,
            "Get All Carousel Successfully"
        ));
})  

CarouselController.get('/news/carousel/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param("id"))
        const response = await CarouselNewsService.getCarouselById(prisma, id);
        return c.json(toCarouselResponse(
            response,
            "Get Carousel Successfully"
        ));
})  

CarouselController.post(
  '/news/carousel',
  withPrisma,
  async (c) => {
    const prisma = c.get('prisma');
    const newsId = Number(c.req.param('newsId'));

    if (Number.isNaN(newsId)) {
      throw new HTTPException(400, {
        message: 'Invalid newsId',
      });
    }

    const body = await c.req.parseBody({ all: true });

    const files = body['images'];

    if (!files) {
      throw new HTTPException(400, {
        message: 'Images field is required',
      });
    }

    const imageFiles = Array.isArray(files) 
      ? files.filter((f): f is File => f instanceof File)
      : files instanceof File ? [files] : [];

    if (imageFiles.length === 0) {
      throw new HTTPException(400, {
        message: 'Images must be valid file(s)',
      });
    }

    await CarouselNewsService.uploadCarouselImages(
      prisma,
      newsId,
      imageFiles,
    );

    return c.json(
      {
        message: 'Carousel images uploaded successfully',
      },
      201,
    );
  },
);

CarouselController.patch(
  '/news/carousel/:id',
  authAdminMiddleware,
  withPrisma,
  async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'));
    const body = await c.req.parseBody();
    const data: Prisma.NewsCarouselUpdateInput = {};
    if (body['image_url'] && typeof body['image_url'] === 'string') {
      data.image_url = body['image_url'];
    }

    const response = await CarouselNewsService.updateCarouselById(
      prisma,
      id,
      data,
    );
    return c.json(toCarouselResponse(
      response,
      'Carousel updated successfully',
    ));
  }
)

CarouselController.delete(
  '/news/carousel/:id',
  authAdminMiddleware,
  withPrisma,
  async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'));
    await CarouselNewsService.deleteCarouselById(
      prisma,
      id,
    );
    return c.json(
      {
        message: 'Carousel deleted successfully',
      },
      200,
    );
  }
)