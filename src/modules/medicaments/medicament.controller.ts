import { Service } from 'typedi'
import { MedicamentService } from './medicament.service'
import { CreateMedicamentDto } from './dtos/create-medicament.dto'
import { Body, Delete, Get, Patch, Post, Route, Tags } from 'tsoa'
import { MedicamentsRoutes } from './constants/medicaments.routes'
import { GetMedicamentDto } from './dtos/get-medicament.dto'
import { validateOutput } from '../../common/validation/validator'
import { UpdateMedicamentDto } from './dtos/update-medicament.dto'

@Tags('medicaments')
@Route('medicaments')
@Service()
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}

  @Post(MedicamentsRoutes.POST_CREATE_MEDICAMENT)
  async createMedicament(@Body() createMedicamentDto: CreateMedicamentDto) {
    return this.medicamentService
      .saveMedicament(createMedicamentDto)
      .then((result) => validateOutput(GetMedicamentDto, result))
  }

  @Get(MedicamentsRoutes.GET_LIST_MEDICAMENTS)
  async listMedicaments() {
    return this.medicamentService
      .listMedicaments()
      .then((result) => validateOutput(GetMedicamentDto, result))
  }

  @Patch(MedicamentsRoutes.PATCH_UPDATE_MEDICAMENT)
  async updateMedicament(
    medicamentId: string,
    @Body() updateMedicamentDto: UpdateMedicamentDto
  ) {
    return this.medicamentService
      .updateMedicament(medicamentId, updateMedicamentDto)
      .then((result) => validateOutput(GetMedicamentDto, result))
  }

  @Delete(MedicamentsRoutes.DELETE_MEDICAMENT)
  async deleteMedicament(medicamentId: string): Promise<void> {
    return this.medicamentService.deleteMedicament(medicamentId)
  }
}
