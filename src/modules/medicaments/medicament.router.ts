import { Container } from 'typedi'
import { MedicamentController } from './medicament.controller'
import express from 'express'
import { MedicamentsRoutes } from './constants/medicaments.routes'

const medicamentController = Container.get(MedicamentController)
const medicamentRouter = express.Router()

medicamentRouter.get(MedicamentsRoutes.GET_LIST_MEDICAMENTS, (req, res, next) =>
  medicamentController
    .listMedicaments()
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

medicamentRouter.post(
  MedicamentsRoutes.POST_CREATE_MEDICAMENT,
  (req, res, next) =>
    medicamentController
      .createMedicament(req.body)
      .then((result) => {
        res.status(201)
        res.send(result)
      })
      .catch((err) => next(err))
)

medicamentRouter.patch(
  MedicamentsRoutes.PATCH_UPDATE_MEDICAMENT,
  (req, res, next) =>
    medicamentController
      .updateMedicament(req.params.medicamentId, req.body)
      .then((result) => res.send(result))
      .catch((err) => next(err))
)

medicamentRouter.delete(MedicamentsRoutes.DELETE_MEDICAMENT, (req, res, next) =>
  medicamentController
    .deleteMedicament(req.params.medicamentId)
    .then(() => res.status(204) && res.send())
    .catch((err) => next(err))
)

export { medicamentRouter }
