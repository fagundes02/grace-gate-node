import mongoose, { type Mongoose } from 'mongoose'

import { type Environment } from '@app/@shared/environment/environment.types'

export default class MongooseSDK {
  private readonly environment: Environment
  private connection: Mongoose | undefined

  constructor(environment: Environment) {
    this.environment = environment
  }

  async startConnection(): Promise<Mongoose> {
    this.connection = await mongoose.connect(this.environment.MONGO_DB_URL, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    })
    this.connection.Promise = Promise
    return this.connection
  }

  async endConnection(): Promise<void> {
    if (!this.connection) {
      throw new Error('Mongoose connection not initialized')
    }
    await this.connection.disconnect()
  }
}
