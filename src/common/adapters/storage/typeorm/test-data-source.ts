import { DataSource } from 'typeorm'
import { commonDataSourceOptions } from './common-data-source.options'
import { EnvVars } from '../../../../env-vars'
import 'dotenv/config'

export const testDataSource: DataSource = new DataSource({
  host: process.env[EnvVars.TEST_POSTGRES_HOST],
  port: +(process.env[EnvVars.TEST_POSTGRES_PORT] || ''),
  database: process.env[EnvVars.TEST_DB],
  username: process.env[EnvVars.POSTGRES_USER],
  password: process.env[EnvVars.POSTGRES_PASSWORD],
  type: 'postgres',
  ...commonDataSourceOptions,
  synchronize: true,
  dropSchema: true,
})
