import { DataSource } from 'typeorm'
import 'dotenv/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { entities } from './entities'

export const dataSource: DataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy()
})

