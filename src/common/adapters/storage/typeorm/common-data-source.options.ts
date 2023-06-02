import { MedicamentEntity } from './entities/medicament.entity'
import { DroneMedicamentJoinEntity } from './entities/drone-medicament-join.entity'
import { DroneEntity } from './entities/drone.entity'
import { LogsEntity } from './entities/logs.entity'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const commonDataSourceOptions = {
  entities: [
    MedicamentEntity,
    DroneMedicamentJoinEntity,
    DroneEntity,
    LogsEntity,
  ],
  migrations: [`${path.resolve(__dirname, './migrations')}/*.ts`],
  namingStrategy: new SnakeNamingStrategy(),
}
