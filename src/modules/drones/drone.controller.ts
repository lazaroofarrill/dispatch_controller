import {Container, Service} from "typedi";
import express from "express";

const droneRouter = express.Router()

@Service()
export class DroneController {
    registerDrone() {

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

droneRouter.use('/', (req, res) => {
    const result = droneController.checkAvailableDrones()
    res.send(result)
})

export {droneRouter}
