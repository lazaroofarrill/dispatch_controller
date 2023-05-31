import {Medicament} from "../models/medicine.schema";
import {IsNumber, Max, Min} from "class-validator";

export class CreateMedicamentDto implements Partial<Medicament> {
    code: string;

    image: string;

    name: string;

    @IsNumber()
    @Min(1)
    @Max(500)
    weight: number;
}
