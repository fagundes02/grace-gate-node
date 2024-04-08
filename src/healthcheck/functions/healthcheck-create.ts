import { type Request, type Response } from 'express'

import FunctionBase from '@app/@shared/base/function.base'
import HealthCheckModelFactory from '@app/healthcheck/healthcheck.model'
import HealthCheckCreateUseCase from '@app/healthcheck/usecases/healthcheck-create.usecase'

export default class HealthCheckCreateFunction extends FunctionBase {
  protected function(): void {
    this.app.post('/healthcheck', async (_req: Request, res: Response) => {
      this.logger.info({ message: 'Endpoint called: POST /healthcheck' })
      const mongooseConn = await this.getMongooseConnection()
      const healthCheckModel = new HealthCheckModelFactory(mongooseConn).model
      const healthCheckCreateUseCase = new HealthCheckCreateUseCase({ model: healthCheckModel })

      const response = await healthCheckCreateUseCase.handle()
      return res.status(201).send(response)
    })
  }
}

exports.handler = new HealthCheckCreateFunction().handler()
