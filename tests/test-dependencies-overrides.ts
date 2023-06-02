import { Container } from 'typedi'
import { DroneRepository } from '../src/modules/drones/repositories/drone-repository'
import { InMemoryDroneRepository } from '../src/modules/drones/repositories/in-memory-drone-repository'
import { InMemoryMedicamentRepository } from '../src/modules/medicaments/repositories/in-memory-medicament.repository'
import { MedicamentRepository } from '../src/modules/medicaments/repositories/medicament.repository'

Container.set(MedicamentRepository, Container.get(InMemoryMedicamentRepository))
Container.set(DroneRepository, Container.get(InMemoryDroneRepository))
