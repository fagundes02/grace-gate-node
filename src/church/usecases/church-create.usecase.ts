import { type Model } from 'mongoose'
import { z } from 'zod'

import BadRequestException from '@app/@shared/exception/bad-request.exception'
import UseCaseBase from '@app/@shared/base/usecase.base'
import { type IChurch } from '@app/church/church.model'
import { mapZodErrorToFieldErrorArray, zodTypeDefaultParam } from '@app/@shared/lib/zod'
import UnprocessableEntityException from '@app/@shared/exception/unprocessable-entity.exception'

interface IChurchCreateUseCaseConstructorParam {
  model: Model<IChurch>
}

const churchCreateInputSchema = z.object({
  name: z
    .string(zodTypeDefaultParam('name', 'texto'))
    .trim()
    .max(100, 'O texto inserido é muito longo. Por favor, limite sua entrada a 100 caracteres.')
})

export default class ChurchCreateUseCase extends UseCaseBase {
  private readonly model: Model<IChurch>

  constructor({ model }: IChurchCreateUseCaseConstructorParam) {
    super()
    this.model = model
  }

  async handle(input: unknown): Promise<IChurch> {
    const parseResult = churchCreateInputSchema.safeParse(input)
    if (!parseResult.success) {
      const message = 'Informação para criação de igreja esta inválida.'
      throw new BadRequestException(message, mapZodErrorToFieldErrorArray(parseResult.error))
    }

    const nameCheck = await this.model.findOne({ name: parseResult.data.name }, { _id: 1 }, { lean: true })
    if (nameCheck) {
      throw new UnprocessableEntityException('Já existe uma igreja com o nome enviado')
    }

    const church = await this.model.create(parseResult.data)
    return church.toObject<IChurch>()
  }
}
