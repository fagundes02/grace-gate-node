import { type oas31 } from 'openapi3-ts'

import SwaggerDocBase from '@app/@shared/base/swagger-doc.base'

export default class HealthCheckCreateDocs extends SwaggerDocBase {
  getPaths(): oas31.PathObject {
    return {
      '/healthcheck': {
        post: {
          tags: ['Healthcheck'],
          summary: 'Creates a healthcheck status to test DB integration',
          responses: this.getResponses(),
          security: [{ BearerAuth: [] }]
        }
      }
    }
  }

  getComponents(): oas31.ComponentsObject {
    return {
      schemas: {
        HealthCheckSchema: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            _id: { type: 'string' },
            time: { type: 'string' }
          }
        }
      }
    }
  }

  protected getResponses(): Record<string, oas31.ResponseObject> {
    return {
      '201': {
        description: 'Returns newly created healthcheck object',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HealthCheckSchema'
            }
          }
        }
      },
      '500': {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InternalServerError'
            }
          }
        }
      }
    }
  }
}
