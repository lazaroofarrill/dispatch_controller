import { MedicamentRepository } from './medicament.repository'
import { Service } from 'typedi'
import { Medicament } from '../models/medicament.model'
import { HttpException } from '../../../common/exceptions/HttpExceptions'
import { UpdateMedicamentDto } from '../dtos/update-medicament.dto'

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

  deleteMedicament(medicamentId: string): Promise<void> {
    throw new HttpException('Not implemented') //TODO
  }

  updateMedicament(
    medicamentId: string,
    updateMedicamentDto: UpdateMedicamentDto
  ): Promise<Medicament> {
    throw new HttpException('Not implemented') //TODO
  }
}
