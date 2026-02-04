import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { CountryService } from '../../services/country/country-service.js';
import { CountryValidation } from '../../validations/country/country-validation.js';
import { HTTPException } from 'hono/http-exception';
import type { ContextWithPrisma } from '../../types/context.js';
import { cache } from 'hono/cache'

export const CountryController = new Hono();

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
// CREATE COUNTRY
// ===============================
CountryController.post('/country', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const raw = await safeJson(c);
  const validated = CountryValidation.CREATE.parse(raw);

  const response = await CountryService.CreateCountry(prisma, validated);
  return c.json(response, 201);
})

// ===============================
// GET ALL COUNTRY
// ===============================
CountryController.get(
  '/country',
  withPrisma,
  cache({
    cacheName: 'countries',
    cacheControl: 'max-age=300', 
  }),
  async (c) => {
    const prisma = c.get('prisma');  
    const response = await CountryService.getAllCountries(prisma)
    return c.json(response, 200);
  }
);


// ===============================
// GET COUNTRY BY ID
// ===============================
CountryController.get('/country/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'));

    if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid category id' });
  }

  const response = await CountryService.getCountryById(prisma, id);
  return c.json(response, 200);
})

// ===============================
// UPDATE COUNTRY
// ===============================
CountryController.patch('/country/:id', withPrisma, async (c) => {
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

// ===============================
// DELETE COUNTRY
// ===============================
CountryController.delete('/country/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma');
    const id = Number(c.req.param('id'))

    if (Number.isNaN(id)) {
        throw new HTTPException(400, { message: 'Invalid country id' });
    }

    const response = await CountryService.deleteCountryById(prisma, id);
    return c.json(response, 200);
})