import { CreateDroneDto } from '../modules/drones/dtos/create-drone.dto'
import {
  createDroneDtoFake,
  createMedicamentDtoFake,
} from '../../tests/fixtures/fakes'
import { CreateMedicamentDto } from '../modules/medicaments/dtos/create-medicament.dto'
import { DroneStateEnum } from '../modules/drones/enums/drone-state.enum'

export const droneSeeds: CreateDroneDto[] = new Array(10).fill(0).map(() => ({
  ...createDroneDtoFake(),
  weightLimit: 500,
  state: DroneStateEnum.IDLE,
  batteryCapacity: 80,
}))

export const medicamentSeeds: CreateMedicamentDto[] = new Array(20)
  .fill(0)
  .map(() => createMedicamentDtoFake())
