import { scaffoldTests } from '../../../tests/create-server'
import express from 'express'
import { createMedicamentDtoFake } from '../../../tests/fixtures/fakes'
import request from 'supertest'
import { CreateMedicamentDto } from './dtos/create-medicament.dto'
import { UpdateMedicamentDto } from './dtos/update-medicament.dto'
import { randomUUID } from 'crypto'
import { GetMedicamentDto } from './dtos/get-medicament.dto'

const { createServer } = scaffoldTests()

let app: express.Application

beforeAll(async () => {
  app = await createServer()
})

it('should allow creating a medicament', async () => {
  const createMedicamentDto: CreateMedicamentDto = createMedicamentDtoFake()

  const { body: createdMedicament } = await request(app)
    .post('/medicaments')
    .send(createMedicamentDto)
    .expect(201)

  expect(createdMedicament).toEqual({
    ...createMedicamentDto,
    id: expect.any(String),
  })
})

it('should allow updating a medicament', async () => {
  const createMedicamentDto: CreateMedicamentDto = createMedicamentDtoFake()

  const { body: createdMedicament } = await request(app)
    .post('/medicaments')
    .send(createMedicamentDto)
    .expect(201)

  expect(createdMedicament).toEqual({
    ...createMedicamentDto,
    id: expect.any(String),
  })

  const updateMedicamentDto: UpdateMedicamentDto = {
    image: randomUUID(),
  }

  const { body: updatedMedicament } = await request(app)
    .patch(`/medicaments/${createdMedicament.id}`)
    .send(updateMedicamentDto)
    .expect(200)

  expect(updatedMedicament).toEqual({
    ...createdMedicament,
    ...updateMedicamentDto,
  })
})

it('should allow listing medicaments', async () => {
  const createMedicamentDtos = new Array(5)
    .fill(0)
    .map(() => createMedicamentDtoFake())

  const createdMedicaments: GetMedicamentDto[] = await Promise.all(
    createMedicamentDtos.map((dto) =>
      request(app)
        .post('/medicaments')
        .send(dto)
        .expect(201)
        .then((result) => result.body)
    )
  )

  const {
    body: listedMedicaments,
  }: {
    body: GetMedicamentDto[]
  } = await request(app).get('/medicaments').expect(200)

  expect(listedMedicaments.sort((a, b) => a.id.localeCompare(b.id))).toEqual(
    createdMedicaments.sort((a, b) => a.id.localeCompare(b.id))
  )
})

it('should allow removing a medicament', async () => {
  const createMedicamentDto: CreateMedicamentDto = createMedicamentDtoFake()

  const { body: createdMedicament } = await request(app)
    .post('/medicaments')
    .send(createMedicamentDto)
    .expect(201)

  await request(app).delete(`/medicaments/${createdMedicament.id}`).expect(204)
})
