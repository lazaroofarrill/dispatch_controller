import { MedicamentRepository } from "./medicament.repository"
import { Service } from "typedi"
import { Medicament } from "../models/medicament.model"

const medicamentStorage: Record<string, Medicament> = {}

@Service()
export class InMemoryMedicamentRepository extends MedicamentRepository {
  find(): Medicament[] {
    return Object.keys(medicamentStorage).map((k) => medicamentStorage[k])
  }

  findById(medicamentId: string): Medicament | null {
    return medicamentStorage[medicamentId] || null
  }

  save(medicament: Medicament): Medicament {
    medicamentStorage[medicament.id] = medicament
    return medicament
  }
}
