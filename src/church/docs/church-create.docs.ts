import { type oas31 } from 'openapi3-ts'

import SwaggerDocBase from '@app/@shared/base/swagger-doc.base'

export default class ChurchCreateDocs extends SwaggerDocBase {
  getPaths(): oas31.PathObject {
    return {
      '/church': {
        post: {
          tags: ['Igreja'],
          summary: 'Cria uma igreja no sistema',
          responses: this.getResponses(),
          requestBody: this.getRequestBody(),
          security: [{ ApiKeyAuth: [] }]
        }
      }
    }
  }

  getComponents(): oas31.ComponentsObject {
    return {
      schemas: {
        ChurchCreateResponseSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            _id: { type: 'string' }
          }
        }
      }
    }
  }

  protected getRequestBody(): oas31.RequestBodyObject | undefined {
    return {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', maxLength: 100 }
            },
            required: ['name']
          }
        }
      }
    }
  }

  protected getResponses(): Record<string, oas31.ResponseObject> {
    return {
      '201': {
        description: 'Retorna a igreja criada',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ChurchCreateResponseSchema'
            }
          }
        }
      },
      '400': {
        description: 'Informações inválidas',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BadRequestError'
            }
          }
        }
      },
      '403': {
        description: 'Falta permissão',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ForbiddenError'
            }
          }
        }
      },
      '422': {
        description: 'Foge da regra de negócio',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UnprocessableEntityError'
            }
          }
        }
      },
      '500': {
        description: 'Erro interno',
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
