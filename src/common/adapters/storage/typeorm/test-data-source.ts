import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { entities } from './entities'

export const testDataSource: DataSource = new DataSource({
  url: process.env.TEST_DATABASE_URL,
  type: 'postgres',
  entities,
  synchronize: true,
  dropSchema: true,
  namingStrategy: new SnakeNamingStrategy()
})
