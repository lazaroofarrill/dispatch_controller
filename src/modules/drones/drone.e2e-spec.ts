import { scaffoldTests } from '../../../tests/create-server'
import express from 'express'
import request from 'supertest'
import { randomUUID } from 'crypto'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { DroneModelEnum } from './enums/drone-model.enum'
import { DroneStateEnum } from './enums/drone-state.enum'
import { CreateMedicamentDto } from '../medicaments/dtos/create-medicament.dto'
import { createDroneDtoFake } from '../../../tests/fixtures/fakes'
import { UpdateDroneDto } from './dtos/update-drone.dto'
import { faker } from '@faker-js/faker'
import { GetDroneDto } from './dtos/get-drone-dto'

const { createServer } = scaffoldTests()

let app: express.Application

beforeAll(async () => {
  app = await createServer()
})

it('should allow listing all drones', async () => {
  const createDroneDtos = new Array(5).fill(0).map(() => createDroneDtoFake())

  const createdDrones: GetDroneDto[] = await Promise.all(
    createDroneDtos.map((createDto) =>
      request(app)
        .post('/drones/')
        .send(createDto)
        .expect(201)
        .then(({ body }) => body)
    )
  )

  const {
    body: listedDrones,
  }: {
    body: GetDroneDto[]
  } = await request(app).get('/drones/').expect(200)
  expect(listedDrones.sort((a, b) => a.id.localeCompare(b.id))).toEqual(
    createdDrones.sort((a, b) => a.id.localeCompare(b.id))
  )
})

it('should allow updating a drone', async () => {
  const createDroneDto: CreateDroneDto = createDroneDtoFake()

  const { body: createdDrone } = await request(app)
    .post('/drones/')
    .send(createDroneDto)
    .expect(201)

  const updateDroneDto: UpdateDroneDto = {
    serialNumber: faker.string.alpha({ length: { min: 1, max: 100 } }),
  }

  const { body: updatedDrone } = await request(app)
    .patch(`/drones/${createdDrone.id}`)
    .send(updateDroneDto)
    .expect(200)

  expect(updatedDrone).toEqual({
    ...createdDrone,
    ...updateDroneDto,
  })
})

it('should allow removing a drone', async () => {
  const createDroneDto = createDroneDtoFake()

  const { body: createdDrone } = await request(app)
    .post('/drones/')
    .send(createDroneDto)
    .expect(201)

  await request(app).delete(`/drones/${createdDrone.id}`).expect(204)
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
