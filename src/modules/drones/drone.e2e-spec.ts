import { scaffoldTests } from '../../../tests/create-server'
import express from 'express'
import request from 'supertest'
import { randomUUID } from 'crypto'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { DroneModelEnum } from './enums/drone-model.enum'
import { DroneStateEnum } from './enums/drone-state.enum'
import { CreateMedicamentDto } from '../medicaments/dtos/create-medicament.dto'

const { createServer } = scaffoldTests()

let app: express.Application

beforeAll(async () => {
  app = await createServer()
})

it('should fail when checking the battery of a drone that does not exist', async () => {
  const randomId = randomUUID()
  await request(app)
    .get(`/drones/${randomId}/battery`)
    .expect(400)
    .expect({
      status: 400,
      message: `Drone with id: "${randomId}" not found`,
    })
})

it('should fail when sending non existent drone id to load item', async () => {
  const randomId = randomUUID()

  await request(app)
    .post(`/drones/${randomId}/items/${randomId}`)
    .expect(400)
    .expect({ status: 400, message: "Drone or Medicament weren't found" })
})

it('item load failures', async () => {
  const createDroneDto: CreateDroneDto = {
    batteryCapacity: 24,
    model: DroneModelEnum.Lightweight,
    serialNumber: '1234',
    state: DroneStateEnum.IDLE,
    weightLimit: 500,
  }

  const { body: createdDrone } = await request(app)
    .post('/drones')
    .send(createDroneDto)
    .expect(201)

  const createMedicamentDto: CreateMedicamentDto = {
    code: 'COV1',
    image: 'lol',
    name: 'COV1',
    weight: 150,
  }

  const { body: createdMedicament } = await request(app)
    .post('/medicaments')
    .send(createMedicamentDto)
    .expect(201)

  // Fail to load when battery below 25
  await request(app)
    .post(`/drones/${createdDrone.id}/items/${createdMedicament.id}`)
    .expect(400)
    .expect({
      status: 400,
      message: "Drone can't be loaded when the battery is below 25%",
    })

  const createDrone2Dto: CreateDroneDto = {
    ...createDroneDto,
    state: DroneStateEnum.DELIVERED,
    batteryCapacity: 90,
  }

  const { body: createdDrone2 } = await request(app)
    .post('/drones')
    .send(createDrone2Dto)
    .expect(201)

  // Fail to load when drone state is not idle
  await request(app)
    .post(`/drones/${createdDrone2.id}/items/${createdMedicament.id}`)
    .expect(400)
    .expect({ status: 400, message: 'Drone is busy' })
})
