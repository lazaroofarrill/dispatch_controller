import { DataSource } from 'typeorm'
import { DroneEntity } from './entities/drone.entity'
import {
  DroneMedicamentJoinEntity
} from './entities/drone-medicament-join.entity'
import { MedicamentEntity } from './entities/medicament.entity'
import 'dotenv/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { LogsEntity } from './entities/logs.entity'


export const dataSource: DataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities: [
    MedicamentEntity,
    DroneMedicamentJoinEntity,
    DroneEntity,
    LogsEntity
  ],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy()
})
