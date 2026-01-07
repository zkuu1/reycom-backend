import { Hono } from 'hono';
import { AdminController } from './controllers/admin/admin-controller.js';
import { CareerController } from './controllers/carrer/carrer-controller.js';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { serve } from '@hono/node-server';

const app = new Hono();

// ROOT
app.get('/', (c) => c.text('Hello Hono!'));

// ROUTE
app.route('/', AdminController);
app.route('/', CareerController);

// ERROR HANDLER
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ errors: err.message }, err.status);
  }

  if (err instanceof ZodError) {
  return c.json(
    {
      errors: err.issues,
    },
    400,
  );
}



  console.error(err);
  return c.json({ errors: 'Internal Server Error' }, 500);
});

serve({ fetch: app.fetch, port: 3000 });
