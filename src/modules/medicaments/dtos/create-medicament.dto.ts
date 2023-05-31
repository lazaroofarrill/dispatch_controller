import { Medicament } from "../models/medicament.model"
import { IsNumber, IsString, Matches, Max, Min } from "class-validator"

export class CreateMedicamentDto implements Partial<Medicament> {
  @Matches(/^[A-Z_0-9]{1,255}$/gm)
  code: string

  @IsString()
  image: string

  @Matches(/^[a-zA-Z\-_]{1,255}$/gm) // allowed only letters, numbers, ‘-‘, ‘_’
  name: string

  @IsNumber()
  @Min(1)
  @Max(500)
  weight: number
}
