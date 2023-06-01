import { Container, Service } from 'typedi'
import { MedicamentService } from './medicament.service'
import { CreateMedicamentDto } from './dtos/create-medicament.dto'
import express from 'express'

const medicamentRouter = express.Router()

@Service()
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {
  }

  createMedicament(createMedicamentDto: CreateMedicamentDto) {
    return this.medicamentService.saveMedicament(createMedicamentDto)
  }

  listMedicaments() {
    return this.medicamentService.listMedicaments()
  }
}

const medicamentController = Container.get(MedicamentController)

medicamentRouter.get('/', (req, res, next) =>
  medicamentController
    .listMedicaments()
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

medicamentRouter.post('/', (req, res, next) =>
  medicamentController
    .createMedicament(req.body)
    .then((result) => {
      res.status(201)
      res.send(result)
    })
    .catch((err) => next(err))
)

export { medicamentRouter }
