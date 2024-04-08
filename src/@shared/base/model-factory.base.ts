import { type Mongoose, type Model } from 'mongoose'

export default abstract class ModelFactoryBase<T> {
  private readonly mongoose: Mongoose

  protected abstract modelName: string

  constructor(mongoose: Mongoose) {
    this.mongoose = mongoose
  }

  get model(): Model<T> {
    if (this.mongoose?.models?.[this.modelName]) {
      return this.mongoose.models[this.modelName] as Model<T>
    } else {
      return this.build()
    }
  }

  protected get mongooseConn(): Mongoose {
    return this.mongoose
  }

  protected abstract build(): Model<T>
}
