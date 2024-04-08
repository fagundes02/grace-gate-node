import type { Config } from '@jest/types'

// eslint-disable-next-line no-restricted-imports
import BaseConfig from './jest.config'

const UnitConfig: Config.InitialOptions = {
  ...BaseConfig,
  coveragePathIgnorePatterns: [
    ...(BaseConfig.coveragePathIgnorePatterns ?? []),
    'src/\\S+/functions/\\S+.ts$',
    'function.base',
    'express.ts',
    'model-factory.base.ts'
  ],
  globalSetup: undefined,
  globalTeardown: undefined,
  testRegex: '.spec.ts$'
}
export default UnitConfig
