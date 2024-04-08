import { type NextFunction, type Request, type Response } from 'express'

import FunctionBase from '@app/@shared/base/function.base'
import ChurchModelFactory from '@app/church/church.model'
import ChurchCreateUseCase from '@app/church/usecases/church-create.usecase'

export default class ChurchCreateFunction extends FunctionBase {
  protected function(): void {
    this.app.post('/church', async (req: Request, res: Response, next: NextFunction) => {
      this.logger.info({ message: 'Endpoint called: POST /church' })
      try {
        const mongooseConn = await this.getMongooseConnection()
        const churchModel = new ChurchModelFactory(mongooseConn).model
        const churchCreateUseCase = new ChurchCreateUseCase({ model: churchModel })

        const church = await churchCreateUseCase.handle(req.body)
        return res.status(201).send(church)
      } catch (error) {
        this.logger.error({
          message: 'Houve um erro durante a criação de uma igreja',
          error: JSON.stringify(error, Object.getOwnPropertyNames(error))
        })
        next(error)
      }
    })
  }
}

exports.handler = new ChurchCreateFunction().handler()
