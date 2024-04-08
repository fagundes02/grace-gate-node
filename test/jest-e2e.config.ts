import type { Config } from '@jest/types'

// eslint-disable-next-line no-restricted-imports
import BaseConfig from './jest.config'

const E2eConfig: Config.InitialOptions = {
  ...BaseConfig,
  collectCoverageFrom: ['src/**/functions/*.ts'],
  testRegex: '.e2e.ts$'
}
export default E2eConfig
