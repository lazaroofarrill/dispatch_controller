import {Container, Service} from "typedi";
import express from "express";
import {CreateDroneDto} from "./dto/create-drone.dto";
import {DroneService} from "./drone.service";

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

    checkBatteryLevel() {

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


export {droneRouter}
