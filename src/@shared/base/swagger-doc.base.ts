import { type oas31 } from 'openapi3-ts'

export default abstract class SwaggerDocBase {
  protected getRequestBody(): oas31.RequestBodyObject | undefined {
    return undefined
  }

  protected abstract getPaths(): oas31.PathsObject

  protected abstract getComponents(): oas31.ComponentsObject

  protected abstract getResponses(): Record<string, oas31.ResponseObject>
}
