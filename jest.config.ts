import type { Config } from "jest"

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  rootDir: ".",
  testRegex: ".*spec\\.ts$",
  roots: [
    '<rootDir>/tests'
  ],
  preset: 'ts-jest',
  setupFiles: ['reflect-metadata']
}

export default config
