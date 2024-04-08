import { NodeEnvironment, type Environment } from '@app/@shared/environment/environment.types'
import HealthCheckUseCase from '@app/healthcheck/usecases/healthcheck.usecase'
import PinoSingleton from '@app/@shared/lib/pino.singleton'

describe('HealthCheckUseCase', () => {
  const environment: Environment = {
    NODE_ENV: NodeEnvironment.TEST,
    MONGO_DB_URL: 'test'
  }
  const usecase = new HealthCheckUseCase({ environment })

  const now = new Date('2023-01-01T10:00:00.000Z')

  describe('handle', () => {
    beforeAll(() => {
      jest.spyOn(PinoSingleton.logger, 'info').mockImplementation((msg): void => {
        console.log(msg)
      })
      jest.useFakeTimers().setSystemTime(now)
    })

    it('should return an ok status', () => {
      expect(usecase.handle()).toEqual({ message: 'All good!', status: 'ok' })
      expect(PinoSingleton.logger.info).toHaveBeenCalledWith({ environment })
      expect(PinoSingleton.logger.info).toHaveBeenCalledWith({ message: 'Healthcheck ok: ', request_time: now.toUTCString() })
    })

    afterAll(() => {
      jest.restoreAllMocks()
      jest.useRealTimers()
    })
  })
})
