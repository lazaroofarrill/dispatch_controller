import { MedicamentEntity } from './entities/medicament.entity'
import { DroneMedicamentJoinEntity } from './entities/drone-medicament-join.entity'
import { DroneEntity } from './entities/drone.entity'
import { LogsEntity } from './entities/logs.entity'

export const entities = [
  MedicamentEntity,
  DroneMedicamentJoinEntity,
  DroneEntity,
  LogsEntity,
]
export const commonDataSourceOptions = {
  entities,
}
