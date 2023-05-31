import { CommonSchema } from "../../../common/models/common.schema"

export class Medicament extends CommonSchema {
  name: string

  weight: number

  code: string

  image: string
}
