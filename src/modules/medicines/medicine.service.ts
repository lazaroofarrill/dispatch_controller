import {Service} from "typedi";
import {MedicineRepository} from "./repositories/medicine.repository";

@Service()
export class MedicineService {
    constructor(private readonly medicineRepository: MedicineRepository) {
    }

}
