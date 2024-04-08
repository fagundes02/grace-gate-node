import { type Model, Types } from 'mongoose'

import { type IChurch } from '@app/church/church.model'
import ChurchCreateUseCase from '@app/church/usecases/church-create.usecase'
import BadRequestException from '@app/@shared/exception/bad-request.exception'
import UnprocessableEntityException from '@app/@shared/exception/unprocessable-entity.exception'

describe('ChurchCreateUseCase', () => {
  const mockResult = { _id: new Types.ObjectId(), name: 'Primeira Igreja Batista Campus Piraquara' }
  const model = {
    create: jest.fn().mockResolvedValue({ toObject: jest.fn().mockResolvedValue(mockResult) }),
    findOne: jest.fn()
  } as unknown as Model<IChurch>

  const usecase = new ChurchCreateUseCase({ model })
  let modelMocked: jest.MockedObject<Model<IChurch>>

  describe('handle', () => {
    beforeEach(() => {
      modelMocked = jest.mocked(model, { shallow: true })
    })

    it('deve criar uma igreja com sucesso', async () => {
      await expect(usecase.handle({ name: 'Primeira Igreja Batista Campus Piraquara' })).resolves.toEqual(mockResult)
      expect(modelMocked.create).toHaveBeenCalledWith({ name: 'Primeira Igreja Batista Campus Piraquara' })
    })

    it('caso seja enviado uma requisição inválida, deve ser lançado um erro do tipo BadRequestException', async () => {
      await expect(usecase.handle({ name: undefined })).rejects.toEqual(
        new BadRequestException('Informação para criação de igreja esta inválida.', [
          { field: 'name', error: 'Campo "name" é obrigatório' }
        ])
      )
      expect(modelMocked.create).not.toHaveBeenCalled()
    })

    it('caso seja enviado uma requisição inválida, deve ser lançado um erro do tipo BadRequestException', async () => {
      await expect(
        usecase.handle({ name: 'campo com mais de 100 caracteres---------------------------------------------------------------------' })
      ).rejects.toEqual(
        new BadRequestException('Informação para criação de igreja esta inválida.', [
          { field: 'name', error: 'O texto inserido é muito longo. Por favor, limite sua entrada a 100 caracteres.' }
        ])
      )
      expect(modelMocked.create).not.toHaveBeenCalled()
    })

    it('caso tente criar uma igreja com nome que ja existe, deve ser lançado um erro do tipo UnprocessableEntityException', async () => {
      modelMocked.findOne.mockResolvedValueOnce({ _id: 'teste_id' })
      await expect(usecase.handle({ name: 'igreja' })).rejects.toEqual(
        new UnprocessableEntityException('Já existe uma igreja com o nome enviado')
      )
      expect(modelMocked.create).not.toHaveBeenCalled()
    })
  })
})
