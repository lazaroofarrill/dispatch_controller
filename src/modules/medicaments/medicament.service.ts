import { Service } from 'typedi'
import { MedicamentRepository } from './repositories/medicament.repository'
import { CreateMedicamentDto } from './dtos/create-medicament.dto'
import { Medicament } from './models/medicament.model'
import { validateInput } from '../../common/validation/validator'

@Service()
export class MedicamentService {
  constructor(private readonly medicamentRepository: MedicamentRepository) {}

  async listMedicaments() {
    return this.medicamentRepository.find()
  }

  async saveMedicament(createMedicamentDto: CreateMedicamentDto) {
    await validateInput(CreateMedicamentDto, createMedicamentDto)

    const newMedicament = Object.assign(new Medicament(), createMedicamentDto)
    return this.medicamentRepository.save(newMedicament)
  }
}
