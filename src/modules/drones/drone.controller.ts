import { Service } from 'typedi'
import { DroneService } from './drone.service'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { validateOutput } from '../../common/validation/validator'
import { GetDroneDto } from './dtos/get-drone-dto'
import { Body, Get, Post, Route } from 'tsoa'
import { Medicament } from '../medicaments/models/medicament.model'
import { DroneRoutes } from './constants/drone.routes'

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

  /**
   * Loads a drone with an instance of a medicament
   * @param droneId
   * @param medicamentId
   */
  @Post(DroneRoutes.POST_LOAD_ITEM)
  loadItem(droneId: string, medicamentId: string) {
    return this.droneService.loadItem(droneId, medicamentId)
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

  @Get(DroneRoutes.GET_AVAILABLE)
  checkAvailableDrones() {
    return this.droneService.getAvailableDrones()
  }

  @Get(DroneRoutes.GET_BATTERY)
  checkBatteryLevel(droneId: string) {
    return this.droneService.checkBatteryLevel(droneId)
  }
}
