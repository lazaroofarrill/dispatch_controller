import express from "express";
import {droneRouter} from "./drones/drone.controller";

const appRouter = express.Router()

appRouter.use('/drones', droneRouter)

export {appRouter}
