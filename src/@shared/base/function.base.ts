import { type Express } from 'express'
import { type Handler } from 'serverless-http'
import { type Mongoose } from 'mongoose'

import PinoSingleton from '@app/@shared/lib/pino.singleton'
import ExpressSDK from '@app/@shared/lib/express'
import { loadEnv } from '@app/@shared/environment/environment-loader'
import MongooseSDK from '@app/@shared/lib/mongoose'

export default abstract class FunctionBase {
  protected readonly logger = PinoSingleton.logger
  protected readonly environment = loadEnv()
  protected readonly mongooseSDK: MongooseSDK
  private readonly expressSdk: ExpressSDK = new ExpressSDK()
  private mongooseConn?: Mongoose

  constructor() {
    this.mongooseSDK = new MongooseSDK(this.environment)
  }

  /**
   * @returns express app for the classes that inherit this
   */
  protected get app(): Express {
    return this.expressSdk.app
  }

  /**
   * Method created specifically for e2e tests to be able to get the express app and run tests
   * @returns Express app reference with endpoint loaded into it.
   */
  loadRoute(): Express {
    this.function()
    this.expressSdk.dispatchServerlessApp()
    return this.app
  }

  /**
   * This method runs the function, and then does the process to disconnect/dispatch it to serverless
   * @returns Serverless handler
   */
  handler(): Handler {
    this.function()
    void this.disconnectDB()
    return this.expressSdk.dispatchServerlessApp()
  }

  /**
   * This method disconnects the DB separately from the handler method, because since the handler cannot
   * be async, we can use this with await inside the e2e tests to keep the application from stopping before
   * the DB
   */
  async disconnectDB(): Promise<void> {
    if (this.mongooseConn) {
      await this.mongooseSDK.endConnection()
      this.mongooseConn = undefined
    }
  }

  /**
   * Method used to connect to the DB for the classes that inherit this
   * @returns Promise with a mongoose connection
   */
  protected async getMongooseConnection(): Promise<Mongoose> {
    if (!this.mongooseConn) {
      this.mongooseConn = await this.mongooseSDK.startConnection()
    }
    return this.mongooseConn
  }

  /**
   * This is the method that EVERY function needs to implement, with it's own logic.
   */
  protected abstract function(): void
}
