import { DataSource } from 'typeorm'
import { EnvVars } from '../../../../env-vars'
import 'dotenv/config'
import { entities } from './common-data-source.options'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const testDataSource: DataSource = new DataSource({
  host: process.env[EnvVars.TEST_POSTGRES_HOST],
  port: +(process.env[EnvVars.TEST_POSTGRES_PORT] || ''),
  database: process.env[EnvVars.TEST_DB],
  username: process.env[EnvVars.POSTGRES_USER],
  password: process.env[EnvVars.POSTGRES_PASSWORD],
  type: 'postgres',
  synchronize: true,
  entities,
  namingStrategy: new SnakeNamingStrategy(),
})
