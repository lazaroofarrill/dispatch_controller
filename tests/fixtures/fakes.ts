import { faker } from '@faker-js/faker'
import { DroneModelEnum } from '../../src/modules/drones/enums/drone-model.enum'
import { DroneStateEnum } from '../../src/modules/drones/enums/drone-state.enum'
import { CreateDroneDto } from '../../src/modules/drones/dtos/create-drone.dto'
import { CreateMedicamentDto } from '../../src/modules/medicaments/dtos/create-medicament.dto'
import { randomUUID } from 'crypto'

export const createDroneDtoFake = (): CreateDroneDto => {
  return {
    batteryCapacity: faker.number.int({ min: 0, max: 100 }),
    model: faker.helpers.arrayElement(Object.values(DroneModelEnum)),
    serialNumber: faker.string.alpha({ length: { min: 1, max: 100 } }),
    state: faker.helpers.arrayElement(Object.values(DroneStateEnum)),
    weightLimit: faker.number.float({ min: 0, max: 500 }),
  }
}

export const createMedicamentDtoFake = (): CreateMedicamentDto => {
  return {
    code: faker.string.alpha({ length: { min: 1, max: 100 } }).toUpperCase(),
    image: randomUUID(),
    name: faker.string.alpha({ length: { min: 1, max: 100 } }),
    weight: faker.number.float({ min: 1, max: 500 }),
  }
}
