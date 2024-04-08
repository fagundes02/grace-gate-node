import { type oas31 } from 'openapi3-ts'
import swaggerUi, { type SwaggerUiOptions } from 'swagger-ui-express'
import { type Request, type Response } from 'express'
import * as pack from '@root/package.json'

import FunctionBase from '@app/@shared/base/function.base'
import { NodeEnvironment } from '@app/@shared/environment/environment.types'
import Documents from '@app/docs/docs.module'

interface SwaggerDefinition {
  paths: oas31.PathsObject
  components: oas31.ComponentsObject
}

export default class ApiDocsFunction extends FunctionBase {
  private readonly environmentsToAvoidDoc = [NodeEnvironment.TEST, NodeEnvironment.PRD]

  mergePathObjects(paths: oas31.PathObject[]): oas31.PathsObject {
    return paths.reduce((acc: oas31.PathsObject, pathObj: oas31.PathObject): oas31.PathsObject => {
      Object.keys(pathObj).forEach((key) => {
        acc[key] = acc[key] ? { ...acc[key], ...pathObj[key] } : pathObj[key]
      })
      return acc
    }, {})
  }

  generateSwaggerDefinition(): SwaggerDefinition {
    const paths = this.mergePathObjects(Documents.map((doc) => doc.getPaths()))
    const components = Documents.reduce<oas31.ComponentsObject>(
      (acc, cur) => ({
        schemas: { ...acc.schemas, ...cur.getComponents()?.schemas },
        securitySchemes: { ...acc.securitySchemes, ...cur.getComponents()?.securitySchemes }
      }),
      {}
    )
    return { paths, components }
  }

  protected function(): void {
    if (!this.environmentsToAvoidDoc.includes(this.environment.NODE_ENV)) {
      const swaggerDefinition = this.generateSwaggerDefinition()
      const swaggerDocument: oas31.OpenAPIObject = {
        openapi: '3.1.0',
        info: { title: pack.name, version: pack.version, description: pack.description },
        servers: [{ url: `${this.environment.BASE_URL}/${this.environment.NODE_ENV}`, description: `${this.environment.NODE_ENV} server` }],
        ...swaggerDefinition
      }
      const swaggerUiOptions: SwaggerUiOptions = { explorer: true }
      this.app.use(`/api-docs`, swaggerUi.serveWithOptions({ redirect: false }), swaggerUi.setup(swaggerDocument, swaggerUiOptions))
    } else {
      this.app.get('/api-docs', (_req: Request, res: Response) => {
        return res.status(200).send({ message: `Api documentation is not enabled for this environment: ${this.environment.NODE_ENV}` })
      })
    }
  }
}

exports.handler = new ApiDocsFunction().handler()
