import {Container, Service} from "typedi";
import express from "express";
import {CreateDroneDto} from "./dto/create-drone.dto";
import {handleSimpleRoute} from "../../common/handlers/handle-route.handler";
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
        return {code: 'ok'}
    }

    checkBatteryLevel() {

    }
}

const droneController = Container.get(DroneController)

droneRouter.get('/', handleSimpleRoute(droneController.checkAvailableDrones))
droneRouter.post('/',
    async (req, res) => {
        const result = await droneController.registerDrone(req.body)
        return res.send(result)
    })


export {droneRouter}
