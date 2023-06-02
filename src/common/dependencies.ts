import { Container } from 'typedi'
import {
  DroneRepository
} from '../modules/drones/repositories/drone-repository'
import {
  MedicamentRepository
} from '../modules/medicaments/repositories/medicament.repository'
import {
  TypeormDroneRepository
} from '../modules/drones/repositories/typeorm-drone.repository'
import {
  TypeormMedicamentRepository
} from '../modules/medicaments/repositories/typeorm-medicament.repository'
import { DataSource } from 'typeorm'
import { dataSource } from './adapters/storage/typeorm/data-source'
import { S3_BUCKET_TOKEN } from './adapters/storage/minio/common-options'
import { Logger } from './logging/logger'
import { TypeormLogger } from './logging/typeorm-logger'

Container.set(DataSource, dataSource)
Container.set(S3_BUCKET_TOKEN, process.env.S3_BUCKET)
Container.set(MedicamentRepository, Container.get(TypeormMedicamentRepository))
Container.set(DroneRepository, Container.get(TypeormDroneRepository))
Container.set(Logger, Container.get(TypeormLogger))

