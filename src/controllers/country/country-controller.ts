import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { CountryService } from '../../services/country/country-service.js';
import { CountryValidation } from '../../validations/country/country-validation.js';
import { HTTPException } from 'hono/http-exception';
import type { ContextWithPrisma } from '../../types/context.js';
import { cache } from 'hono/cache'
import {safeJson} from '../../helpers/safeJson.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';

export const CountryController = new Hono();

CountryController.post('/country', withPrisma, authAdminMiddleware,async (c) => {
  const prisma = c.get('prisma');
  const raw = await safeJson(c);
  const validated = CountryValidation.CREATE.parse(raw);

  const response = await CountryService.CreateCountry(prisma, validated);
  return c.json(response, 201);
})


CountryController.get(
  '/country',
  withPrisma,
  cache({
    cacheName: 'countries',
    cacheControl: 'max-age=300', 
  }),
  async (c) => {
    const prisma = c.get('prisma');  

    const page = Number(c.req.query('page') ?? 1)
    const limitRaw = Number(c.req.query('limit') ?? 10)
    const limit = Math.min(limitRaw, 100)
    const response = await CountryService.getAllCountries(
      prisma,
      page,
      limit
    )
    return c.json(response, 200);
  }
);

CountryController.get('/country/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'));

    if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid category id' });
  }

  const response = await CountryService.getCountryById(prisma, id);
  return c.json(response, 200);
})

CountryController.patch('/country/:id', withPrisma, authAdminMiddleware, async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'))

    if (Number.isNaN(id)) {
        throw new HTTPException(400, { message: 'Invalid country id' });
    }

    const raw = await safeJson(c)
    const validated = await CountryValidation.UPDATE.parseAsync(raw)

      if (Object.keys(validated).length === 0) {
    throw new HTTPException(400, {
      message: 'Minimum one field is required to update country',
    });
    }

    const response = await CountryService.updateCountryById(prisma, id, validated);
    return c.json(response, 200);
})

CountryController.delete('/country/:id', withPrisma, authAdminMiddleware, async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'))

    if (Number.isNaN(id)) {
        throw new HTTPException(400, { message: 'Invalid country id' });
    }

    const response = await CountryService.deleteCountryById(prisma, id);
    return c.json(response, 200);
})