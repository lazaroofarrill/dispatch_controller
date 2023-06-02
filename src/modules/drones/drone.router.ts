import { Container } from 'typedi'
import { DroneController } from './drone.controller'
import express from 'express'

const droneController = Container.get(DroneController)
const droneRouter = express.Router()

droneRouter.get('/', (req, res, next) =>
  droneController
    .checkAvailableDrones()
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.post('/', (req, res, next) =>
  droneController
    .registerDrone(req.body)
    .then((result) => {
      res.status(201)
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
)

droneRouter.get('/:id/battery', (req, res, next) =>
  droneController
    .checkBatteryLevel(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.patch('/:id/items/load/:medicamentId', (req, res, next) =>
  droneController
    .loadItem(req.params.id, req.params.medicamentId)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.get('/:id/items', (req, res, next) =>
  droneController
    .checkLoadedItems(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

export { droneRouter }
