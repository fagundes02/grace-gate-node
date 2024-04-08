import type { Config } from '@jest/types'

const BaseConfig: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'test/coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.build/',
    '.enum.ts',
    '.dto.ts',
    '.types.ts',
    '.model.ts',
    'pino.singleton.ts',
    'swagger-doc.base.ts',
    'src/docs',
    '.docs.ts',
    '.exception.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json'
      }
    ]
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@root/(.*)$': '<rootDir>/$1'
  },
  preset: 'ts-jest',
  rootDir: '../',
  roots: ['<rootDir>/src/', '<rootDir>/test/', '<rootDir>'],
  testEnvironment: 'node',
  testRegex: '.(spec|e2e).ts$',
  verbose: true,
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>'],
  workerIdleMemoryLimit: '7168MB',
  globalSetup: '<rootDir>/test/e2e/setup.ts',
  globalTeardown: '<rootDir>/test/e2e/teardown.ts',
  testPathIgnorePatterns: ['/node_modules/', '/.build/'],
  modulePathIgnorePatterns: ['/.build/']
}

export default BaseConfig
