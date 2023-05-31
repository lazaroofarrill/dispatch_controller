import {Medicament} from "../models/medicine.schema";
import {Container} from "typedi";
import {InMemoryMedicamentRepository} from "./in-memory-medicament.repository";

export abstract class MedicamentRepository {
    abstract save(medicine: Medicament): Medicament

    abstract findById(medicamentId: string): Medicament | null

    abstract find(): Medicament[]
}

