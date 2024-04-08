import { Schema, type Model, type ObjectId } from 'mongoose'

import ModelFactoryBase from '@app/@shared/base/model-factory.base'

export interface IHealthcheck {
  _id: ObjectId
  status: string
  time: Date
}

export default class HealthCheckModelFactory extends ModelFactoryBase<IHealthcheck> {
  protected modelName = 'Healthcheck'

  protected build(): Model<IHealthcheck> {
    const schema = new Schema<IHealthcheck>(
      {
        status: { type: 'string', required: true },
        time: { type: Date, default: Date.now }
      },
      { versionKey: false }
    )
    return this.mongooseConn.model<IHealthcheck>(this.modelName, schema)
  }
}
