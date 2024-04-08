import UseCaseBase from '@app/@shared/base/usecase.base'
import { type Environment } from '@app/@shared/environment/environment.types'

export interface IHealthCheckUseCaseConstructorParam {
  environment: Environment
}

interface IHealthCheckResponse {
  status: string
  message: string
}

export default class HealthCheckUseCase extends UseCaseBase {
  private readonly environment: Environment

  constructor({ environment }: IHealthCheckUseCaseConstructorParam) {
    super()
    this.environment = environment
  }

  handle(): IHealthCheckResponse {
    this.logger.info({ environment: this.environment })
    this.logger.info({ message: 'Healthcheck ok: ', request_time: new Date().toUTCString() })
    const response: IHealthCheckResponse = { message: 'All good!', status: 'ok' }
    return response
  }
}
