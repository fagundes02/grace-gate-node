import { type Model } from 'mongoose'

import { type IHealthcheck } from '@app/healthcheck/healthcheck.model'
import HealthCheckCreateUseCase from '@app/healthcheck/usecases/healthcheck-create.usecase'

describe('HealthCheckCreateUseCase', () => {
  const model = {
    create: jest.fn().mockResolvedValue({ toObject: jest.fn().mockResolvedValue({ status: 'ok' }) })
  } as unknown as Model<IHealthcheck>

  const usecase = new HealthCheckCreateUseCase({ model })
  let modelMocked: jest.MockedObject<Model<IHealthcheck>>

  describe('handle', () => {
    beforeEach(() => {
      modelMocked = jest.mocked(model, { shallow: true })
    })

    it('should create a healthcheck object', async () => {
      await expect(usecase.handle()).resolves.toEqual({ status: 'ok' })
      expect(modelMocked.create).toHaveBeenCalledWith({ status: 'ok' })
    })

    it('should test error', async () => {
      const error = new Error('test')
      modelMocked.create.mockRejectedValueOnce(error)
      await expect(usecase.handle()).rejects.toEqual(error)
      expect(modelMocked.create).toHaveBeenCalledWith({ status: 'ok' })
    })
  })
})
