import { DataSource } from 'typeorm'
import 'dotenv/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { entities } from './entities'
import { EnvVars } from '../../../../env-vars'
import { fileURLToPath } from 'url'
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const dataSource: DataSource = new DataSource({
  host: process.env[EnvVars.POSTGRES_HOST],
  port: +(process.env[EnvVars.POSTGRES_PORT] || ''),
  database: process.env[EnvVars.APP_DB],
  username: process.env[EnvVars.POSTGRES_USER],
  password: process.env[EnvVars.POSTGRES_PASSWORD],
  type: 'postgres',
  entities,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [`${path.resolve(__dirname, './migrations')}/*.ts`]
})

