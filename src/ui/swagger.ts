export const openApiDoc = {
  openapi: '3.0.0',

  info: {
    title: 'API Documentation Reycom',
    version: '1.0.0',
    description: 'API documentation for Reycom Service',
  },

  // =====================================
  // TAG GROUPS (HEADER SWAGGER)
  // =====================================
  tags: [
    { name: 'Admin', description: 'Admin management APIs' },
    { name: 'Apply', description: 'Job apply APIs' },
    { name: 'Career', description: 'Career APIs' },
    { name: 'Category', description: 'Category APIs' },
    { name: 'News', description: 'News APIs' },
    { name: 'Videos', description: 'Videos APIs' },
    { name: 'Country', description: 'Country APIs' },
    { name: 'Company', description: 'Company APIs' },
    { name: 'Branch', description: 'Branch Company APIs' },
  ],

  paths: {

    // ======================================================
    // ADMIN
    // ======================================================
    '/admin': {
      get: { tags: ['Admin'], summary: 'Get all admins', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Admin'], summary: 'Create admin', responses: { '201': { description: 'Created' } } },
    },

    '/admin/{id}': {
      get: {
        tags: ['Admin'],
        summary: 'Get admin by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
      },
      patch: {
        tags: ['Admin'],
        summary: 'Update admin by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Updated' } },
      },
      delete: {
        tags: ['Admin'],
        summary: 'Delete admin by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Deleted' } },
      },
    },

    // ======================================================
    // APPLY
    // ======================================================
    '/apply': {
      get: { tags: ['Apply'], summary: 'Get all applications', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Apply'], summary: 'Create application', responses: { '201': { description: 'Created' } } },
    },

    '/apply/{id}': {
      get: { tags: ['Apply'], summary: 'Get application by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Apply'], summary: 'Update application', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Apply'], summary: 'Delete application', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    // ======================================================
    // CAREER
    // ======================================================
    '/career': {
      get: { tags: ['Career'], summary: 'Get all careers', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Career'], summary: 'Create career', responses: { '201': { description: 'Created' } } },
    },

    '/career/{id}': {
      get: { tags: ['Career'], summary: 'Get career by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Career'], summary: 'Update career', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Career'], summary: 'Delete career', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    // ======================================================
    // CATEGORY
    // ======================================================
    '/category': {
      get: { tags: ['Category'], summary: 'Get all categories', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Category'], summary: 'Create category', responses: { '201': { description: 'Created' } } },
    },

    '/category/{id}': {
      get: { tags: ['Category'], summary: 'Get category by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Category'], summary: 'Update category', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Category'], summary: 'Delete category', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    // ======================================================
    // NEWS
    // ======================================================
    '/news': {
      get: { tags: ['News'], summary: 'Get all news', responses: { '200': { description: 'OK' } } },
      post: { tags: ['News'], summary: 'Create news', responses: { '201': { description: 'Created' } } },
    },

    '/news/{id}': {
      get: { tags: ['News'], summary: 'Get news by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['News'], summary: 'Update news', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['News'], summary: 'Delete news', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    '/news/carousel': {
      get: { tags: ['News'], summary: 'Get news carousel', responses: { '200': { description: 'OK' } } },
    },

    // ======================================================
    // VIDEOS
    // ======================================================
    '/videos': {
      get: { tags: ['Videos'], summary: 'Get all videos', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Videos'], summary: 'Create video', responses: { '201': { description: 'Created' } } },
    },

    '/videos/{id}': {
      get: { tags: ['Videos'], summary: 'Get video by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Videos'], summary: 'Update video', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Videos'], summary: 'Delete video', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    // ======================================================
    // COUNTRY
    // ======================================================
    '/country': {
  get: {
    tags: ['Country'],
    summary: 'Get all countries (paginated)',
    description: 'Retrieve list of countries with pagination support',

    // =========================
    // SECURITY (API KEY)
    // =========================
    security: [
      {
        ApiKeyAuth: [],
      },
    ],

    // =========================
    // QUERY PARAMS
    // =========================
    parameters: [
      {
        name: 'page',
        in: 'query',
        required: false,
        description: 'Page number',
        schema: {
          type: 'integer',
          example: 1,
          default: 1,
        },
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        description: 'Number of items per page',
        schema: {
          type: 'integer',
          example: 10,
          default: 10,
        },
      },
    ],

    // =========================
    // RESPONSES
    // =========================
    responses: {
      '200': {
        description: 'Countries retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Success get countries',
                },
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      nameCountry: { type: 'string', example: 'Indonesia' },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                      },
                    },
                  },
                },
                meta: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 10 },
                    total: { type: 'integer', example: 100 },
                    totalPages: { type: 'integer', example: 10 },
                  },
                },
              },
            },
          },
        },
      },

      '401': {
        description: 'Unauthorized - Invalid API Key',
      },
    },
  },
},


    '/country/{id}': {
      get: { tags: ['Country'], summary: 'Get country by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Country'], summary: 'Update country', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Country'], summary: 'Delete country', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    // ======================================================
    // COMPANY
    // ======================================================
    '/company': {
      get: { tags: ['Company'], summary: 'Get all companies', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Company'], summary: 'Create company', responses: { '201': { description: 'Created' } } },
    },

    '/company/{id}': {
      get: { tags: ['Company'], summary: 'Get company by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Company'], summary: 'Update company', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Company'], summary: 'Delete company', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },

    // ======================================================
    // BRANCH
    // ======================================================
    '/branch': {
      get: { tags: ['Branch'], summary: 'Get all branches', responses: { '200': { description: 'OK' } } },
      post: { tags: ['Branch'], summary: 'Create branch', responses: { '201': { description: 'Created' } } },
    },

    '/branch/{id}': {
      get: { tags: ['Branch'], summary: 'Get branch by ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      patch: { tags: ['Branch'], summary: 'Update branch', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Updated' } } },
      delete: { tags: ['Branch'], summary: 'Delete branch', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' } } },
    },
  },
};
