import request from 'supertest'
import reset from '@test/e2e/reset'

import ChurchCreateFunction from '@app/church/functions/church-create'

describe('ChurchCreateFunction', () => {
  const churchCreateFunction = new ChurchCreateFunction()
  const app = churchCreateFunction.loadRoute()
  const payload = { name: 'Primeira Igreja Batista Campus Piraquara' }

  afterEach(async () => {
    await reset()
  })

  it('POST /church deve retornar codigo 201 ao criar uma igreja com sucesso', async () => {
    const response = await request(app).post('/church').send(payload)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      _id: expect.any(String),
      name: payload.name,
      __v: expect.any(Number)
    })
  })

  it('POST /church deve retornar codigo 422 ao tentar criar uma igreja com nome que ja foi criado', async () => {
    const response = await request(app).post('/church').send(payload)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      _id: expect.any(String),
      name: payload.name,
      __v: expect.any(Number)
    })

    const responseDuplicate = await request(app).post('/church').send(payload)
    expect(responseDuplicate.status).toBe(422)
    expect(responseDuplicate.body).toEqual({ message: 'Já existe uma igreja com o nome enviado' })
  })

  it('POST /church deve retornar codigo 400 ao tentar criar uma igreja com nome vazio', async () => {
    const response = await request(app).post('/church').send({})
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      errors: [{ error: 'Campo "name" é obrigatório', field: 'name' }],
      message: 'Informação para criação de igreja esta inválida.'
    })
  })

  it('POST /church deve retornar codigo 400 ao tentar criar uma igreja com nome maior do que o esperado', async () => {
    const response = await request(app)
      .post('/church')
      .send({ name: 'campo com mais de 100 caracteres---------------------------------------------------------------------' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      errors: [{ error: 'O texto inserido é muito longo. Por favor, limite sua entrada a 100 caracteres.', field: 'name' }],
      message: 'Informação para criação de igreja esta inválida.'
    })
  })

  afterAll(async () => {
    await churchCreateFunction.disconnectDB()
  })
})
