import { Service } from 'typedi'
import { MedicamentService } from './medicament.service'
import { CreateMedicamentDto } from './dtos/create-medicament.dto'

@Service()
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}

  createMedicament(createMedicamentDto: CreateMedicamentDto) {
    return this.medicamentService.saveMedicament(createMedicamentDto)
  }

  listMedicaments() {
    return this.medicamentService.listMedicaments()
  }
}
