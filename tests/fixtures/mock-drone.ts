import { Drone } from '../../src/modules/drones/models/drone.model'
import { faker } from '@faker-js/faker'
import { DroneModelEnum } from '../../src/modules/drones/enums/drone-model.enum'
import { DroneStateEnum } from '../../src/modules/drones/enums/drone-state.enum'

export const mockDrone = (): Drone => {
  return {
    batteryCapacity: faker.number.int({ min: 0, max: 100 }),
    id: faker.string.uuid(),
    model: faker.helpers.arrayElement(Object.values(DroneModelEnum)),
    serialNumber: faker.string.alpha({ length: { min: 1, max: 100 } }),
    state: faker.helpers.arrayElement(Object.values(DroneStateEnum)),
    weightLimit: faker.number.float({ min: 0, max: 500 }),
  }
}
