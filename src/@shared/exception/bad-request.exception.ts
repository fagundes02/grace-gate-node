import { type IFieldError } from '@app/@shared/interface/error.interface'

export default class BadRequestException extends Error {
  constructor(
    message: string,
    readonly errors: IFieldError[]
  ) {
    super(message)
  }
}
