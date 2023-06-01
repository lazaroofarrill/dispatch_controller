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


Container.set(MedicamentRepository, Container.get(TypeormMedicamentRepository))
Container.set(DroneRepository, Container.get(TypeormDroneRepository))
