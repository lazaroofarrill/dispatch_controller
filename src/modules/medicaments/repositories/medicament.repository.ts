import { Medicament } from "../models/medicament.model"

export abstract class MedicamentRepository {
  abstract save(medicine: Medicament): Medicament

  abstract findById(medicamentId: string): Medicament | null

  abstract find(): Medicament[]
}
