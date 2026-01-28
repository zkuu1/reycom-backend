import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';
import { VideoService } from '../../services/videos/video-service.js';
import type { ContextWithPrisma } from '../../types/context.js';
import { HTTPException } from 'hono/http-exception';
import { videoValidation } from '../../validations/videos/video-validation.js';

export const VideoController = new Hono<ContextWithPrisma>();

async function safeJson(c: any) {
  try {
    return await c.req.json();
  } catch {
    throw new HTTPException(400, {
      message: 'Invalid or empty JSON body',
    });
  }
}

// ===============================
// GET ALL VIDEOS
// ===============================
VideoController.get('/videos', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const response = await VideoService.getAllVideos(prisma);
    return c.json(response, 200);
})

// ===============================
// GET VIDEO BY ID
// ===============================
VideoController.get('/videos/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_video = Number(c.req.param('id'));
    const response = await VideoService.getVideoById(prisma, id_video);
    return c.json(response, 200);
})

// ===============================
// CREATE VIDEO
// ===============================
VideoController.post('/videos', authAdminMiddleware, withPrisma, async (c) => {
    const raw = await safeJson(c);
    const validated = videoValidation.CREATE.parse(raw);
    const prisma = c.get('prisma');
    const response = await VideoService.createVideo(prisma, validated);
    return c.json(response, 201);
})

// ===============================
// UPDATE VIDEO BY ID
// ===============================
VideoController.patch('/videos/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_video = Number(c.req.param('id'));

    if (Number.isNaN(id_video)) {
    throw new HTTPException(400, { message: 'Invalid category id' });
  }

    const raw = await safeJson(c);
    const validated = videoValidation.UPDATE.parse(raw);

    if (Object.keys(validated).length === 0) {
    throw new HTTPException(400, {
      message: 'Minimum one field is required to update videos',
    });
  }
    const response = await VideoService.updateVideoById(
      prisma,
      id_video,
      validated,
      { id: id_video, ...validated }
    );
    return c.json(response, 200);
})

// ===============================
// DELETE VIDEO BY ID
// ===============================
VideoController.delete('/videos/:id', authAdminMiddleware, withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id_video = Number(c.req.param('id'));
    const response = await VideoService.deleteVideoById(prisma, id_video);
    return c.json(response, 200);
})