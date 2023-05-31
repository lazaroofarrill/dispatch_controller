import { Container } from "typedi"
import { DroneRepository } from "./drones/repositories/drone-repository"
import { InMemoryDroneRepository } from "./drones/repositories/in-memory-drone-repository"
import { MedicamentRepository } from "./medicaments/repositories/medicament.repository"
import { InMemoryMedicamentRepository } from "./medicaments/repositories/in-memory-medicament.repository"

Container.set(MedicamentRepository, Container.get(InMemoryMedicamentRepository))
Container.set(DroneRepository, Container.get(InMemoryDroneRepository))
