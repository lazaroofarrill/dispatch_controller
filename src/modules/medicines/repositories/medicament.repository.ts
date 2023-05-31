import {Medicament} from "../models/medicine.schema";

export abstract class MedicamentRepository {
    abstract save(medicine: Medicament): Medicament

    abstract findById(medicamentId: string): Medicament | null

    abstract find(): Medicament[]
}

