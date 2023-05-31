import {Container, Service} from "typedi";
import express from "express";
import {DroneService} from "./drone.service";
import {CreateDroneDto} from "./dtos/create-drone.dto";

const droneRouter = express.Router()

@Service()
export class DroneController {
    constructor(private readonly droneService: DroneService) {
    }

    registerDrone(createDroneDto: CreateDroneDto) {
        return this.droneService.registerDrone(createDroneDto)
    }

    loadItem() {

    }

    checkLoadedItems() {

    }

    checkAvailableDrones() {
        return this.droneService.getAvailableDrones()
    }

    checkBatteryLevel(droneId: string) {
        return this.droneService.checkBatteryLevel(droneId)
    }
}

const droneController = Container.get(DroneController)

droneRouter.get('/',
    (req, res, next) =>
        droneController.checkAvailableDrones()
            .then(result => res.send(result))
            .catch(err => next(err)))

droneRouter.post('/',
    (req, res, next) =>
        droneController.registerDrone(req.body)
            .then(result => res.send(result))
            .catch(err => next(err)))

droneRouter.get('/:id/battery',
    (req, res, next) =>
        droneController.checkBatteryLevel(req.params.id)
            .then((result) => res.send(result))
            .catch(err => next(err)))


export {droneRouter}
