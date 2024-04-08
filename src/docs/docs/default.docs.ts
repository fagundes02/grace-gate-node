import { type oas31 } from 'openapi3-ts'

import SwaggerDocBase from '@app/@shared/base/swagger-doc.base'

export default class DefaultDocs extends SwaggerDocBase {
  getPaths(): oas31.PathObject {
    return {}
  }

  getComponents(): oas31.ComponentsObject {
    return {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key'
        }
      },
      schemas: {
        BadRequestError: {
          description: 'Retorna esse erro quando informações da requisição estão inválidas.',
          type: 'object',
          properties: {
            message: { type: 'string' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  error: { type: 'string' },
                  field: { type: 'string' }
                },
                required: ['error', 'field']
              }
            }
          },
          required: ['message', 'errors']
        },
        ForbiddenError: {
          description: 'Retorna esse erro quando ocorre falta de permissão para metodos que necessitam de api-key.',
          type: 'object',
          properties: {
            message: { type: 'string' }
          },
          required: ['message']
        },
        UnauthorizedError: {
          description: 'Retorna esse erro quando ocorre falta de permissão/autenticação para metodos que necessitam de bearer token.',
          type: 'object',
          properties: {
            message: { type: 'string' }
          },
          required: ['message']
        },
        UnprocessableEntityError: {
          description: 'Retorna erro para informações que fogem do esperado da regra de negocio.',
          type: 'object',
          properties: {
            message: { type: 'string' }
          },
          required: ['message']
        },
        InternalServerError: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          },
          required: ['message']
        }
      }
    }
  }

  protected getResponses(): Record<string, oas31.ResponseObject> {
    return {}
  }
}
