import { Service } from 'typedi'
import { MedicamentService } from './medicament.service'
import { CreateMedicamentDto } from './dtos/create-medicament.dto'
import { Body, Get, Post, Route, Tags } from 'tsoa'
import { MedicamentsRoutes } from './constants/medicaments.routes'
import { GetMedicamentDto } from './dtos/get-medicament.dto'
import { validateOutput } from '../../common/validation/validator'

@Tags('medicaments')
@Route('medicaments')
@Service()
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}

  @Post(MedicamentsRoutes.POST_CREATE_MEDICAMENTS)
  createMedicament(@Body() createMedicamentDto: CreateMedicamentDto) {
    return this.medicamentService
      .saveMedicament(createMedicamentDto)
      .then((result) => validateOutput(GetMedicamentDto, result))
  }

  @Get(MedicamentsRoutes.GET_LIST_MEDICAMENTS)
  listMedicaments() {
    return this.medicamentService
      .listMedicaments()
      .then((result) => validateOutput(GetMedicamentDto, result))
  }
}
