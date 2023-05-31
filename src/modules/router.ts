import express from "express"
import { droneRouter } from "./drones/drone.controller"
import { medicamentRouter } from "./medicaments/medicament.controller"
import bodyParser from "body-parser"
import { exceptionsFilter } from "../common/filters/exceptions-filter"

const appRouter = express.Router()

const jsonParser = bodyParser.json()

appRouter.use(jsonParser)
appRouter.use("/drones", droneRouter)
appRouter.use("/medicaments", medicamentRouter)
appRouter.use(exceptionsFilter)


export { appRouter }
