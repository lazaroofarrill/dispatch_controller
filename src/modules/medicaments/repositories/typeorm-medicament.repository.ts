import { MedicamentRepository } from './medicament.repository'
import { Medicament } from '../models/medicament.model'
import { Repository } from 'typeorm'
import { MedicamentEntity } from '../../../common/adapters/storage/typeorm/entities/medicament.entity'
import { Service } from 'typedi'
import {
  BadRequestException,
  InternalServerError,
} from '../../../common/exceptions/HttpExceptions'
import { getAsyncRepo } from '../../../common/adapters/storage/typeorm/middlewares/typeorm-transaction-middleware'
import { UpdateMedicamentDto } from '../dtos/update-medicament.dto'

@Service()
export class TypeormMedicamentRepository extends MedicamentRepository {
  async find(): Promise<Medicament[]> {
    return this.medicamentRepository
      .find()
      .then((medicaments) =>
        medicaments.map((medicament) => medicament.toMedicament())
      )
  }

  async findById(medicamentId: string): Promise<Medicament | null> {
    return this.medicamentRepository
      .findOne({ where: { id: medicamentId } })
      .then((medicament) => medicament?.toMedicament() || null)
  }

  async save(medicament: Medicament): Promise<Medicament> {
    return await this.medicamentRepository
      .save(medicament)
      .then((medicament) =>
        this.medicamentRepository.findOne({ where: { id: medicament.id } })
      )
      .then((medicament) => {
        if (!medicament) {
          throw new InternalServerError()
        }
        return medicament.toMedicament()
      })
  }

  async updateMedicament(
    medicamentId: string,
    updateMedicamentDto: UpdateMedicamentDto
  ): Promise<Medicament> {
    return this.medicamentRepository
      .update({ id: medicamentId }, updateMedicamentDto)
      .then(() =>
        this.medicamentRepository.findOne({ where: { id: medicamentId } })
      )
      .then((result) => {
        if (!result) {
          throw new BadRequestException('Medicament not found')
        }
        return result.toMedicament()
      })
  }

  async deleteMedicament(medicamentId: string): Promise<void> {
    return this.medicamentRepository
      .delete({ id: medicamentId })
      .then(() => undefined)
  }

  private get medicamentRepository(): Repository<MedicamentEntity> {
    return getAsyncRepo(MedicamentEntity)
  }
}
