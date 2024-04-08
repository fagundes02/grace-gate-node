import { type ZodError } from 'zod'

import { type IFieldError } from '@app/@shared/interface/error.interface'

interface IZodTypeDefaultParam {
  required_error: string
  invalid_type_error: string
}

/**
 * Metodo criado para gerar a configuração generica do Zod para tipos, de modo que isso será usado de forma geral
 * no sistema, para validações que são padrão, como obrigatoriedade ou tipo, podendo se extender caso necessário.
 * @param variableName Nome do campo para mensagem
 * @param expectedType Tipo esperado do campo. Ex: Texto, Númerico, Lista, etc.
 * @returns
 */
export function zodTypeDefaultParam(variableName: string, expectedType: string): IZodTypeDefaultParam {
  const param: IZodTypeDefaultParam = {
    required_error: `Campo "${variableName}" é obrigatório`,
    invalid_type_error: `Campo "${variableName}" deve ser do tipo ${expectedType}`
  }

  return param
}

/**
 * Metodo que mapeia o tipo de erro do zod, para o tipo de erro generico de retorno
 * @param error Erro lançado ao chamar o metodo .parse/safeParse
 * @returns Array de FieldError, formatado para retorno.
 */
export function mapZodErrorToFieldErrorArray(error: ZodError): IFieldError[] {
  return error.issues.map<IFieldError>((issue) => ({ field: issue.path[0], error: issue.message }))
}
