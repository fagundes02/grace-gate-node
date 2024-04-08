import { type Model, Schema, type ObjectId } from 'mongoose'

import ModelFactoryBase from '@app/@shared/base/model-factory.base'

export interface IChurch {
  _id: ObjectId
  name: string
}

export default class ChurchModelFactory extends ModelFactoryBase<IChurch> {
  protected modelName = 'Church'

  protected build(): Model<IChurch> {
    const schema = new Schema<IChurch>({
      name: { type: 'string', required: true }
    }).index({ name: 1 }, { unique: true })
    return this.mongooseConn.model<IChurch>(this.modelName, schema)
  }
}
