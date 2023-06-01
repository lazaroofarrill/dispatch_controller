import express from 'express'
import { droneRouter } from './drones/drone.controller'
import { medicamentRouter } from './medicaments/medicament.controller'
import bodyParser from 'body-parser'
import { exceptionsFilter } from '../common/filters/exceptions-filter'
import { mediaRouter } from './media/media.controller'

const appRouter = express.Router()

const jsonParser = bodyParser.json()

appRouter.use(jsonParser)
appRouter.use('/drones', droneRouter)
appRouter.use('/medicaments', medicamentRouter)
appRouter.use('/media', mediaRouter)
appRouter.use(exceptionsFilter)

export { appRouter }
