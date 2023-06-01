import { DataSource } from 'typeorm'
import { DroneEntity } from './entities/drone.entity'
import {
  DroneMedicamentJoinEntity
} from './entities/drone-medicament-join.entity'
import { MedicamentEntity } from './entities/medicament.entity'

export const dataSource: DataSource = new DataSource({
  url: '',
  type: 'postgres',
  entities: [
    DroneEntity,
    DroneMedicamentJoinEntity,
    MedicamentEntity
  ]
})
