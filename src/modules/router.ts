import express from 'express'
import bodyParser from 'body-parser'
import { exceptionsFilter } from '../common/filters/exceptions-filter'
import { droneRouter } from './drones/drone.router'
import { medicamentRouter } from './medicaments/medicament.router'
import { mediaRouter } from './media/media.router'

const appRouter = express.Router()

const jsonParser = bodyParser.json()

appRouter.use(jsonParser)
appRouter.use('/drones', droneRouter)
appRouter.use('/medicaments', medicamentRouter)
appRouter.use('/media', mediaRouter)
appRouter.use(exceptionsFilter)

export { appRouter }
