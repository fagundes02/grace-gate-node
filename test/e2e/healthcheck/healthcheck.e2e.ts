import request from 'supertest'

import HealthCheckFunction from '@app/healthcheck/functions/healthcheck'
import HealthCheckUseCase from '@app/healthcheck/usecases/healthcheck.usecase'

describe('HealthCheckFunction', () => {
  const app = new HealthCheckFunction().loadRoute()

  it('GET /healthcheck should return 200 code', async () => {
    const response = await request(app).get('/healthcheck')
    expect(response.status).toBe(200)
  })

  it('GET /healthcheck should return 500 code if an unhandled error happens', async () => {
    jest.spyOn(HealthCheckUseCase.prototype, 'handle').mockImplementationOnce(() => {
      throw new Error('test')
    })
    const response = await request(app).get('/healthcheck')
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Internal Error'
    })
  })
})
