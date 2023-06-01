import { Container } from 'typedi'
import {
  DroneRepository
} from '../modules/drones/repositories/drone-repository'
import {
  InMemoryDroneRepository
} from '../modules/drones/repositories/in-memory-drone-repository'
import {
  MedicamentRepository
} from '../modules/medicaments/repositories/medicament.repository'
import {
  DroneTypeormRepository
} from './adapters/storage/typeorm/repositories/drone.typeorm-repository'
import { dataSource } from './adapters/storage/typeorm/data-source'
import { Logger } from './logging/logger'

//Initialize TypeOrm
dataSource.initialize().then(() => {
  const logger = Container.get(Logger)
  logger.log('DataSource Initialized')
})

Container.set(MedicamentRepository, Container.get(DroneTypeormRepository))
Container.set(DroneRepository, Container.get(InMemoryDroneRepository))
