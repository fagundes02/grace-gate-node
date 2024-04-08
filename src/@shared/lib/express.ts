import express, { type Request, type Express, type Response, type NextFunction } from 'express'
import serverless, { type Handler } from 'serverless-http'
import cors from 'cors'

import PinoSingleton from '@app/@shared/lib/pino.singleton'
import BadRequestException from '@app/@shared/exception/bad-request.exception'
import { type IResponseError } from '@app/@shared/interface/error.interface'
import UnprocessableEntityException from '@app/@shared/exception/unprocessable-entity.exception'

export default class ExpressSDK {
  readonly app: Express

  private readonly logger = PinoSingleton.logger

  constructor() {
    this.app = express()
    this.app.use(express.json({ limit: '1mb' }))
    this.app.use(cors())
  }

  dispatchServerlessApp(): Handler | never {
    this.app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
      this.logger.error({ message: error.message, type: error.name, error })
      let status = 500
      let response: IResponseError = { message: 'Internal Error' }
      if (error instanceof BadRequestException) {
        status = 400
        response = { errors: error.errors, message: error.message }
      }
      if (error instanceof UnprocessableEntityException) {
        status = 422
        response.message = error.message
      }
      return res.status(status).send(response)
    })
    return serverless(this.app)
  }
}
