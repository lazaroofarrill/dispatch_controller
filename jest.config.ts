import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: '.*spec\\.ts$',
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src'
  ],
  preset: 'ts-jest/presets/default-esm',
  setupFiles: ['reflect-metadata', './tests/setup-tests.ts'],
  setupFilesAfterEnv: ['jest-extended/all']
}

export default config
