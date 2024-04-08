import { type Model } from 'mongoose'

import UseCaseBase from '@app/@shared/base/usecase.base'
import { type IHealthcheck } from '@app/healthcheck/healthcheck.model'

interface IHealthcheckCreateUseCaseConstructorParam {
  model: Model<IHealthcheck>
}

export default class HealthCheckCreateUseCase extends UseCaseBase {
  private readonly model: Model<IHealthcheck>

  constructor({ model }: IHealthcheckCreateUseCaseConstructorParam) {
    super()
    this.model = model
  }

  async handle(): Promise<IHealthcheck> {
    const result = await this.model.create({ status: 'ok' })
    return await result.toObject()
  }
}
