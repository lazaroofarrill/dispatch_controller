import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { entities } from './entities'
import { EnvVars } from '../../../../env-vars'

export const testDataSource: DataSource = new DataSource({
  host: process.env[EnvVars.TEST_POSTGRES_HOST],
  port: +(process.env[EnvVars.TEST_POSTGRES_PORT] || ''),
  database: process.env[EnvVars.TEST_DB],
  username: process.env[EnvVars.POSTGRES_USER],
  password: process.env[EnvVars.POSTGRES_PASSWORD],
  type: 'postgres',
  entities,
  synchronize: true,
  dropSchema: true,
  namingStrategy: new SnakeNamingStrategy()
})
