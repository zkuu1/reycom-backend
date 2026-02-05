import { Hono } from 'hono';
import { AdminController } from './controllers/admin/admin-controller.js';
import { CareerController } from './controllers/career/career-controller.js';
import { ApplyController } from './controllers/apply/apply-controller.js';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { formatZodIssues } from './helpers/errorResponse.js';
import { serve } from '@hono/node-server';
import { CategoryController } from './controllers/category/category-controller.js';
import { NewsController } from './controllers/news/news-controller.js';
import { CarouselController } from './controllers/carousel/carousel-controller.js';
import { VideoController } from './controllers/videos/video-controller.js';
import { CompanyController } from './controllers/company/company-controller.js';
import { CountryController } from './controllers/country/country-controller.js';
import { corsMiddleware } from './helpers/cors.js';

const app = new Hono();


app.use(corsMiddleware);

// ROOT
app.get('/', (c) => c.text('Hello Hono!'));

// ROUTE
app.route('/', AdminController);
app.route('/', CareerController);
app.route('/', ApplyController);
app.route('/', CategoryController);
app.route('/', NewsController);
app.route('/', CarouselController)
app.route('/', VideoController);
app.route('/', CompanyController);
app.route('/', CountryController);


// ERROR HANDLER
app.onError((err, c) => {


  if (err instanceof ZodError) {
    return c.json(
      {
        message: 'Validation error',
        errors: formatZodIssues(err.issues),
      },
      400,
    );
  }

  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message,
      },
      err.status,
    );
  }

  console.error(err);
  return c.json(
    {
      message: 'Internal Server Error',
    },
    500,
  );
});

serve({ fetch: app.fetch, port: 3000 });
