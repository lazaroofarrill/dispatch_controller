import { Container } from 'typedi'
import { DroneController } from './drone.controller'
import express from 'express'
import { DroneRoutes } from './constants/drone.routes'

const droneController = Container.get(DroneController)
const droneRouter = express.Router()

droneRouter.get(DroneRoutes.GET_AVAILABLE, (req, res, next) =>
  droneController
    .checkAvailableDrones()
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.post(DroneRoutes.POST_REGISTER, (req, res, next) =>
  droneController
    .registerDrone(req.body)
    .then((result) => {
      res.status(201)
      res.send(result)
    })
    .catch((err) => next(err))
)

droneRouter.get(DroneRoutes.GET_BATTERY, (req, res, next) =>
  droneController
    .checkBatteryLevel(req.params.droneId)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.post(DroneRoutes.POST_ADD_ITEM, (req, res, next) =>
  droneController
    .loadItem(req.params.droneId, req.params.medicamentId)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.delete(DroneRoutes.DELETE_UNLOAD_ITEM, (req, res, next) =>
  droneController
    .unloadItem(req.params.droneId, req.params.medicamentId)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

droneRouter.get(DroneRoutes.GET_ITEMS, (req, res, next) =>
  droneController
    .checkLoadedItems(req.params.droneId)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

export { droneRouter }
