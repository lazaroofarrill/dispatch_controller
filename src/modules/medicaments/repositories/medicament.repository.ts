import { Medicament } from '../models/medicament.model'
import { Service } from 'typedi'

@Service()
export abstract class MedicamentRepository {
  abstract save(medicament: Medicament): Promise<Medicament>

  abstract findById(medicamentId: string): Promise<Medicament | null>

  abstract find(): Promise<Medicament[]>
}
