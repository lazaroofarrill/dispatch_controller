import { Container } from 'typedi'
import { MedicamentController } from './medicament.controller'
import express from 'express'

const medicamentController = Container.get(MedicamentController)
const medicamentRouter = express.Router()

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
