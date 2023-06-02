import { Container } from 'typedi'
import { Logger } from '../common/logging/logger'
import cron from 'node-cron'
import {
  DroneEntity
} from '../common/adapters/storage/typeorm/entities/drone.entity'
import { TypeormLogger } from '../common/logging/typeorm-logger'
import { DataSource } from 'typeorm'

Container.set(Logger, Container.get(TypeormLogger))

const dataSource = Container.get(DataSource)

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
  cron.schedule('* * * * *', checkBatteryLevel, { runOnInit: true })
})

