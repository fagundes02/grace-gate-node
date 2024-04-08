import mongoose, { type Mongoose } from 'mongoose'

import MongooseSDK from '@app/@shared/lib/mongoose'
import { NodeEnvironment } from '@app/@shared/environment/environment.types'

describe('mongoose', () => {
  let mongooseSDK: MongooseSDK

  const resetSdk = (): void => {
    mongooseSDK = new MongooseSDK({ MONGO_DB_URL: 'URL', NODE_ENV: NodeEnvironment.TEST })
  }

  beforeEach(() => {
    resetSdk()
  })

  describe('startConnection', () => {
    it('should start connection successfully', async () => {
      const resolved = {} as unknown as Mongoose
      jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(resolved)
      await expect(mongooseSDK.startConnection()).resolves.toEqual(resolved)
    })
  })

  describe('endConnection', () => {
    it('should end connection successfully', async () => {
      const resolved = { disconnect: jest.fn() } as unknown as Mongoose
      jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(resolved)
      await mongooseSDK.startConnection()
      await expect(mongooseSDK.endConnection()).resolves.toBeUndefined()
    })

    it('should throw an error in case the connection does not exist before calling disconnect', async () => {
      await expect(mongooseSDK.endConnection()).rejects.toEqual(new Error('Mongoose connection not initialized'))
    })
  })
})
