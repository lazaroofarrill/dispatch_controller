import { IsInt, IsPositive } from 'class-validator'
import { validateInput, validateOutput } from './validator'
import {
  BadRequestException,
  InternalServerError,
} from '../exceptions/HttpExceptions'

class ValidationTest {
  @IsInt()
  @IsPositive()
  value: number
}

let instance: ValidationTest

beforeEach(() => {
  instance = {
    value: 100,
  }
})

it('should pass validation of an input object and return it', async () => {
  expect(await validateInput(ValidationTest, instance)).toEqual(instance)
})

it('should fail to validate an undefined object', async () => {
  await expect(() =>
    validateInput(ValidationTest, null as any)
  ).rejects.toThrow(new Error('Object for validation cannot be undefined'))
})

it('should fail to validate an invalid input object', async () => {
  instance.value = -1

  await expect(validateInput(ValidationTest, instance)).rejects.toThrow(
    new BadRequestException(
      '[{"isPositive":"value must be a positive number"}]'
    )
  )
})

it('should pass output validation of a single object', async () => {
  await expect(validateOutput(ValidationTest, instance)).resolves.toEqual(
    instance
  )
})

it('should pass output validation for an array of objects', async () => {
  await expect(
    validateOutput(ValidationTest, [instance, instance])
  ).resolves.toEqual([instance, instance])
})

it('should fail output validation for one bad object', async () => {
  instance.value = -1
  await expect(validateOutput(ValidationTest, instance)).rejects.toEqual(
    new InternalServerError('Output Encoding Error')
  )
})

it('should fail output validation for one of the objects in the array', async () => {
  await expect(
    validateOutput(ValidationTest, [instance, { value: -1 }])
  ).rejects.toThrow(new InternalServerError('Output Encoding Error'))
})
