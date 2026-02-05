export const openApiDoc = {
  openapi: '3.0.0', // This is the required version field
  info: {
    title: 'API Documentation Reycom',
    version: '1.0.0',
    description: 'API documentation for your service',
  },
  paths: {
    '/country': {
      get: {
        summary: 'Get All Countries',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
      post: {
        summary: '  '
      }
    },

    '/admin': {
      get: {
        summary: 'Get All Admin',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
  },

}