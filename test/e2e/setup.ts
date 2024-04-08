import { MongoMemoryServer } from 'mongodb-memory-server'

// eslint-disable-next-line no-restricted-imports, import/no-relative-parent-imports
import { NodeEnvironment, environmentSchema } from '../../src/@shared/environment/environment.types'

const mockMongoDatabase = async (): Promise<string> => {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  // @ts-expect-error Setting mongod globally for the teardown
  global.__MONGOD__ = mongod
  return uri
}

const envSetup = (mongoDns: string): void => {
  process.env.NODE_ENV = NodeEnvironment.TEST
  process.env.MONGO_DB_URL = mongoDns

  const environment = Object.keys(environmentSchema.shape).reduce((acc, cur) => {
    return { ...acc, [cur]: process.env[cur] }
  }, {})
  console.log(environment)
}

const setup = async (): Promise<void> => {
  const mongoDns = await mockMongoDatabase()
  envSetup(mongoDns)
}

export default setup
