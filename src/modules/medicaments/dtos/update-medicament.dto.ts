import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator'

export class UpdateMedicamentDto {
  @Matches(/^[A-Z_0-9]{1,255}$/gm)
  @IsOptional()
  code?: string

  @IsString()
  @IsOptional()
  image?: string

  @Matches(/^[a-zA-Z\-_0-9]{1,255}$/gm) // allowed only letters, numbers, ‘-‘, ‘_’
  @IsOptional()
  name?: string

  @IsNumber()
  @Min(1)
  @Max(500)
  @IsOptional()
  weight?: number
}
