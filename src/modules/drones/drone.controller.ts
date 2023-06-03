import { Service } from 'typedi'
import { DroneService } from './drone.service'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { validateOutput } from '../../common/validation/validator'
import { GetDroneDto } from './dtos/get-drone-dto'
import { Body, Delete, Get, Post, Route, Tags } from 'tsoa'
import { Medicament } from '../medicaments/models/medicament.model'
import { DroneRoutes } from './constants/drone.routes'
import { GetBatteryLevelDto } from './dtos/get-battery-level.dto'

@Tags('drones')
@Route('drones')
@Service()
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  /**
   * Registers a drone in the system
   * @param createDroneDto
   */
  @Post(DroneRoutes.POST_REGISTER)
  registerDrone(@Body() createDroneDto: CreateDroneDto) {
    return this.droneService
      .registerDrone(createDroneDto)
      .then((drone) => validateOutput(GetDroneDto, drone))
  }

  @Get(DroneRoutes.GET_ITEMS)
  checkLoadedItems(droneId: string): Promise<
    {
      medicament: Medicament
      quantity: number
    }[]
  > {
    return this.droneService.checkLoadedItems(droneId)
  }

  @Post(DroneRoutes.POST_ADD_ITEM)
  loadItem(droneId: string, medicamentId: string) {
    return this.droneService.loadItem(droneId, medicamentId)
  }

  @Delete(DroneRoutes.DELETE_UNLOAD_ITEM)
  unloadItem(droneId: string, medicamentId: string) {
    return this.droneService.unloadItem(droneId, medicamentId)
  }

  @Get(DroneRoutes.GET_AVAILABLE)
  checkAvailableDrones() {
    return this.droneService
      .getAvailableDrones()
      .then((result) => validateOutput(GetDroneDto, result))
  }

  @Get(DroneRoutes.GET_BATTERY)
  checkBatteryLevel(droneId: string) {
    return this.droneService
      .checkBatteryLevel(droneId)
      .then((result) => validateOutput(GetBatteryLevelDto, result))
  }
}
