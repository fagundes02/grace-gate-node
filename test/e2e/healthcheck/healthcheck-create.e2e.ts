import request from 'supertest'

import HealthCheckCreateFunction from '@app/healthcheck/functions/healthcheck-create'

describe('HealthCheckCreateFunction', () => {
  const healthCheckCreateFunction = new HealthCheckCreateFunction()
  const app = healthCheckCreateFunction.loadRoute()

  it('POST /healthcheck should return 201 code', async () => {
    const response = await request(app).post('/healthcheck')
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      _id: expect.any(String),
      status: 'ok',
      time: expect.any(String)
    })
  })

  afterAll(async () => {
    await healthCheckCreateFunction.disconnectDB()
  })
})
