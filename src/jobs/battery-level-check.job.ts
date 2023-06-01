import { Container } from 'typedi'
import { Logger } from '../common/logging/logger'
import cron from 'node-cron'
import '../common/dependencies'
import { dataSource } from '../common/adapters/storage/typeorm/data-source'
import {
  DroneEntity
} from '../common/adapters/storage/typeorm/entities/drone.entity'
import { TypeormLogger } from '../common/logging/typeorm-logger'

Container.set(Logger, Container.get(TypeormLogger))

const checkBatteryLevel = async () => {
  const logger = Container.get(Logger)
  const droneRepository = dataSource.getRepository(DroneEntity)

  const drones = await droneRepository.find()

  logger.info(drones.map(drone => ({
    id: drone.id,
    battery: drone.batteryCapacity
  })))
}

//Schedule job to run every minute
dataSource.initialize().then(() => {
  cron.schedule(' * * * * *', checkBatteryLevel, { runOnInit: true })
})

