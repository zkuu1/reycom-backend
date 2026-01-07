import { Hono } from 'hono';
import { AdminController } from './controllers/admin/admin-controller.js';
import { CareerController } from './controllers/carrer/carrer-controller.js';
import { ApplyController } from './controllers/apply/apply-controller.js';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { formatZodIssues } from './helpers/errorResponse.js';
import { serve } from '@hono/node-server';

const app = new Hono();

// ROOT
app.get('/', (c) => c.text('Hello Hono!'));

// ROUTE
app.route('/', AdminController);
app.route('/', CareerController);
app.route('/', ApplyController);

// ERROR HANDLER
app.onError((err, c) => {

  // ✅ VALIDATION ERROR
  if (err instanceof ZodError) {
    return c.json(
      {
        message: 'Validation error',
        errors: formatZodIssues(err.issues),
      },
      400,
    );
  }

  // ✅ CUSTOM HTTP ERROR
  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message,
      },
      err.status,
    );
  }

  // ✅ UNKNOWN ERROR
  console.error(err);
  return c.json(
    {
      message: 'Internal Server Error',
    },
    500,
  );
});

serve({ fetch: app.fetch, port: 3000 });
