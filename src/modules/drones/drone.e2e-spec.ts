import { scaffoldTests } from '../../../tests/scaffold-tests'
import express from 'express'
import request from 'supertest'
import { randomUUID } from 'crypto'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { CreateMedicamentDto } from '../medicaments/dtos/create-medicament.dto'
import {
  createDroneDtoFake,
  createMedicamentDtoFake,
} from '../../../tests/fixtures/fakes'
import { UpdateDroneDto } from './dtos/update-drone.dto'
import { faker } from '@faker-js/faker'
import { GetDroneDto } from './dtos/get-drone-dto'
import { DroneStateEnum } from './enums/drone-state.enum'

const { createServer } = scaffoldTests()

let app: express.Application

beforeAll(async () => {
  app = await createServer()
})

it('should allow creating a drone', async () => {
  const createDroneDto: CreateDroneDto = createDroneDtoFake()

  await request(app).post('/drones/').send(createDroneDto).expect(201)
})

it('should fail to create a drone with duplicated serial number', async () => {
  const createDroneDto: CreateDroneDto = createDroneDtoFake()
  const createDroneDto2: CreateDroneDto = createDroneDtoFake()
  createDroneDto2.serialNumber = createDroneDto.serialNumber

  await request(app).post('/drones/').send(createDroneDto).expect(201)
  await request(app)
    .post('/drones/')
    .send(createDroneDto2)
    .expect(400)
    .expect({ status: 400, message: 'Unique key constraint failed' })
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

it("should fail updating a drone's serial number to an existing one", async () => {
  const createDroneDto: CreateDroneDto = createDroneDtoFake()
  const createDroneDto2: CreateDroneDto = createDroneDtoFake()

  const { body: createdDrone1 } = await request(app)
    .post('/drones/')
    .send(createDroneDto)
    .expect(201)

  const { body: createdDrone2 } = await request(app)
    .post('/drones/')
    .send(createDroneDto2)
    .expect(201)

  const updateDroneDto: UpdateDroneDto = {
    serialNumber: createdDrone2.serialNumber,
  }

  await request(app)
    .patch(`/drones/${createdDrone1.id}`)
    .send(updateDroneDto)
    .expect(400)
    .expect({ status: 400, message: 'Unique key constraint failed' })
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
  //Create drone with battery capacity below 25%
  const createDroneDto: CreateDroneDto = {
    ...createDroneDtoFake(),
    state: DroneStateEnum.IDLE,
    weightLimit: 500,
    batteryCapacity: 24,
  }

  const { body: createdDrone } = await request(app)
    .post('/drones')
    .send(createDroneDto)
    .expect(201)

  const createMedicamentDto: CreateMedicamentDto = createMedicamentDtoFake()

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

  const createDrone2Dto: CreateDroneDto = createDroneDtoFake()

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
