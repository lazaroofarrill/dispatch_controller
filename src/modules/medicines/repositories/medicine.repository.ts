import {Medicine} from "../models/medicine.schema";

export abstract class MedicineRepository {
    abstract save(medicine: Medicine): Medicine

    abstract findById(medicineId: string): Medicine
}
