import { DataSource } from 'typeorm'
import 'dotenv/config'
import { EnvVars } from '../../../../env-vars'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const dataSource: DataSource = new DataSource({
  host: process.env[EnvVars.POSTGRES_HOST],
  port: +(process.env[EnvVars.POSTGRES_PORT] || ''),
  database: process.env[EnvVars.APP_DB],
  username: process.env[EnvVars.POSTGRES_USER],
  password: process.env[EnvVars.POSTGRES_PASSWORD],
  type: 'postgres',
  synchronize: false,
  migrations: [`${path.resolve(__dirname, './migrations')}/*.ts`],
  namingStrategy: new SnakeNamingStrategy(),
})
