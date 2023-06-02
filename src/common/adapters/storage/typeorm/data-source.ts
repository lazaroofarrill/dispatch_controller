import { DataSource } from 'typeorm'
import 'dotenv/config'
import { commonDataSourceOptions } from './common-data-source.options'
import { EnvVars } from '../../../../env-vars'

export const dataSource: DataSource = new DataSource({
  host: process.env[EnvVars.POSTGRES_HOST],
  port: +(process.env[EnvVars.POSTGRES_PORT] || ''),
  database: process.env[EnvVars.APP_DB],
  username: process.env[EnvVars.POSTGRES_USER],
  password: process.env[EnvVars.POSTGRES_PASSWORD],
  type: 'postgres',
  ...commonDataSourceOptions,
  synchronize: false,
})
