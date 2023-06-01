import { MedicamentRepository } from './medicament.repository'
import { Service } from 'typedi'
import { Medicament } from '../models/medicament.model'

const medicamentStorage: Record<string, Medicament> = {}

@Service()
export class InMemoryMedicamentRepository extends MedicamentRepository {
  async find(): Promise<Medicament[]> {
    return Object.keys(medicamentStorage).map((k) => medicamentStorage[k])
  }

  async findById(medicamentId: string): Promise<Medicament | null> {
    return medicamentStorage[medicamentId] || null
  }

  async save(medicament: Medicament): Promise<Medicament> {
    medicamentStorage[medicament.id] = medicament
    return medicament
  }
}
