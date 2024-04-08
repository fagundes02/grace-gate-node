export interface IFieldError {
  field: string | number
  error: string
}

export interface IResponseError {
  message: string
  errors?: IFieldError[]
}
