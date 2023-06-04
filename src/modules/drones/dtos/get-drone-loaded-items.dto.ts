import { IsInt, IsPositive, ValidateNested } from 'class-validator'
import { GetMedicamentDto } from '../../medicaments/dtos/get-medicament.dto'
import { Type } from 'class-transformer'

export class GetDroneLoadedItemsDto {
  @IsInt()
  @IsPositive()
  quantity: number

  @Type(() => GetMedicamentDto)
  @ValidateNested()
  medicament: GetMedicamentDto
}
