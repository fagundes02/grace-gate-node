import { loadEnv } from '@app/@shared/environment/environment-loader'
import { NodeEnvironment, environmentSchema, type Environment } from '@app/@shared/environment/environment.types'

describe('environment-loader:loadEnv', () => {
  let env: NodeJS.ProcessEnv
  beforeEach(() => {
    env = Object.assign({}, process.env)
  })

  afterEach(() => {
    process.env = env
  })
  it('should return a valid environment', () => {
    process.env = {
      NODE_ENV: NodeEnvironment.TEST,
      MONGO_DB_URL: 'http://test.com'
    }
    const result = Object.keys(environmentSchema.shape).reduce((acc, cur) => {
      return { ...acc, [cur]: process.env[cur] }
    }, {})
    expect(loadEnv()).toEqual(result as Environment)
  })

  it('should throw an error if the environment is invalid', () => {
    process.env = {}
    expect(() => {
      loadEnv()
    }).toThrow(new Error('Invalid environment variables'))
  })
})
