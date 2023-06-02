import { Container, Service } from 'typedi'
import express from 'express'
import { DroneService } from './drone.service'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { validateOutput } from '../../common/validation/validator'
import { GetDroneDto } from './dtos/get-drone-dto'

const droneRouter = express.Router()

@Service()
export class DroneController {
  constructor(private readonly droneService: DroneService) {
  }

  registerDrone(createDroneDto: CreateDroneDto) {
    return this.droneService.registerDrone(createDroneDto)
      .then(drone => validateOutput(GetDroneDto, drone).then(() => drone))
  }

  loadItem(droneId: string, medicamentId: string) {
    return this.droneService.loadItem(droneId, medicamentId)
  }

  checkLoadedItems(droneId: string) {
    return this.droneService.checkLoadedItems(droneId)
  }

  checkAvailableDrones() {
    return this.droneService.getAvailableDrones()
  }

  checkBatteryLevel(droneId: string) {
    return this.droneService.checkBatteryLevel(droneId)
  }
}

const droneController = Container.get(DroneController)

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
  {
    console.log(req.params)
    return droneController
      .loadItem(req.params.id, req.params.medicamentId)
      .then((result) => res.send(result))
      .catch((err) => next(err))
  }
)

droneRouter.get('/:id/items', (req, res, next) =>
  droneController
    .checkLoadedItems(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => next(err))
)

export { droneRouter }
