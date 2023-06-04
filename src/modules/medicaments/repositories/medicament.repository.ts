import { Medicament } from '../models/medicament.model'
import { Service } from 'typedi'
import { UpdateMedicamentDto } from '../dtos/update-medicament.dto'

@Service()
export abstract class MedicamentRepository {
  abstract save(medicament: Medicament): Promise<Medicament>

  abstract findById(medicamentId: string): Promise<Medicament | null>

  abstract find(): Promise<Medicament[]>

  abstract updateMedicament(
    medicamentId: string,
    updateMedicamentDto: UpdateMedicamentDto
  ): Promise<Medicament>

  abstract deleteMedicament(medicamentId: string): Promise<void>
}
