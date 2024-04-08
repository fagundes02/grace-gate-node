import { type oas31 } from 'openapi3-ts'

import SwaggerDocBase from '@app/@shared/base/swagger-doc.base'

export default class HealthCheckDocs extends SwaggerDocBase {
  getPaths(): oas31.PathObject {
    return {
      '/healthcheck': {
        get: {
          tags: ['Healthcheck'],
          summary: 'Checks server status',
          responses: this.getResponses()
        }
      }
    }
  }

  getComponents(): oas31.ComponentsObject {
    return {}
  }

  protected getResponses(): Record<string, oas31.ResponseObject> {
    return {
      '200': {
        description: 'Returns server status successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
}
