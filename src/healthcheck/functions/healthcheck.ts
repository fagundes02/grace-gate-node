import { type Request, type Response } from 'express'

import FunctionBase from '@app/@shared/base/function.base'
import HealthCheckUseCase from '@app/healthcheck/usecases/healthcheck.usecase'

export default class HealthCheckFunction extends FunctionBase {
  protected function(): void {
    this.app.get('/healthcheck', (_req: Request, res: Response) => {
      const usecase = new HealthCheckUseCase({ environment: this.environment })
      this.logger.info({ message: 'Endpoint called: /healthcheck' })
      const response = usecase.handle()
      return res.status(200).send(response)
    })
  }
}

exports.handler = new HealthCheckFunction().handler()
