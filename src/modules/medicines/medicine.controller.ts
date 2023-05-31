import {Service} from "typedi";
import {MedicineService} from "./medicine.service";
import {CreateMedicineDto} from "./dtos/create-medicine.dto";

@Service()
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {
    }

    createMedicine(createMedicineDto: CreateMedicineDto) {

    }

}
