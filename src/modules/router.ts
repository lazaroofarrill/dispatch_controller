import express from "express";
import {droneRouter} from "./drones/drone.controller";
import {medicamentRouter} from "./medicines/medicament.controller";

const appRouter = express.Router()


appRouter.use('/drones', droneRouter)
appRouter.use('/medicaments', medicamentRouter)

export {appRouter}
