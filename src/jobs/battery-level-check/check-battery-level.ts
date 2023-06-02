import './dependencies'
import { DroneEntity } from '../../common/adapters/storage/typeorm/entities/drone.entity'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'
import { Logger } from '../../common/logging/logger'

const dataSource = Container.get(DataSource)
const logger = Container.get(Logger)

export const checkBatteryLevel = async () => {
  const droneRepository = dataSource.getRepository(DroneEntity)

  const drones = await droneRepository.find()

  logger.info(
    drones.map((drone) => ({
      id: drone.id,
      battery: drone.batteryCapacity,
    }))
  )
}
