import { CreateDroneDto } from './create-drone.dto'
import { validateInput } from '../../../common/validation/validator'
import { DroneModelEnum } from '../enums/drone-model.enum'
import { DroneStateEnum } from '../enums/drone-state.enum'
import 'jest-extended'

let createDroneDto: CreateDroneDto

beforeEach(() => {
  // Create valid dto
  createDroneDto = {
    batteryCapacity: 100,
    model: DroneModelEnum.Lightweight,
    serialNumber: 'S4123 012',
    state: DroneStateEnum.IDLE,
    weightLimit: 500,
  }
})

it('should pass a valid dto', async () => {
  return validateInput(CreateDroneDto, createDroneDto)
})

const invalidDtos: {
  label: string
  dto: Partial<CreateDroneDto>
  message: any
}[] = [
  {
    label: 'should fail because serial number is longer than 100 characters',
    dto: {
      serialNumber: new Array(101).fill('1').join(''),
    },
    message: {
      message: [
        {
          maxLength:
            'serialNumber must be shorter than or equal to 100 characters',
        },
      ],
      status: 400,
    },
  },
  {
    dto: {
      model: 'InvalidDroneModel' as any,
    },
    label: 'should fail because model is not one of the valid enum value',
    message: {
      message: [
        {
          isEnum:
            'model must be one of the following values: Lightweight, Middleweight, Cruiserweight, Heavyweight',
        },
      ],
      status: 400,
    },
  },
  {
    dto: {
      weightLimit: -1,
    },
    label: 'should fail because weight limit must be positive',
    message: {
      message: [{ min: 'weightLimit must not be less than 0' }],
      status: 400,
    },
  },
  {
    dto: {
      weightLimit: 501,
    },
    label: 'should fail because weight limit must not be higher than 500',
    message: {
      message: [{ max: 'weightLimit must not be greater than 500' }],
      status: 400,
    },
  },
  {
    dto: {
      batteryCapacity: -1,
    },
    label: 'should fail because battery capacity must be positive',
    message: {
      message: [{ min: 'batteryCapacity must not be less than 0' }],
      status: 400,
    },
  },
  {
    dto: {
      batteryCapacity: 1.2,
    },
    label: 'should fail because battery capacity must be an integer',
    message: {
      message: [{ isInt: 'batteryCapacity must be an integer number' }],
      status: 400,
    },
  },
  {
    dto: {
      batteryCapacity: 101,
    },
    label: 'should fail because battery capacity must not be higher than 100',
    message: {
      message: [{ max: 'batteryCapacity must not be greater than 100' }],
      status: 400,
    },
  },
  {
    dto: {
      state: 'SomeInvalidState' as any,
    },
    label: 'should fail because state is not one of the valid enum values',
    message: {
      message: [
        {
          isEnum:
            'state must be one of the following values: IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING',
        },
      ],
      status: 400,
    },
  },
]

for (const { label, dto, message } of invalidDtos) {
  it(`${label}`, () =>
    expect(
      validateInput(CreateDroneDto, { ...createDroneDto, ...dto })
    ).rejects.toThrow(new Error(JSON.stringify(message.message))))
}
