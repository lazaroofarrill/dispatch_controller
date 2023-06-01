import { MedicamentRepository } from './medicament.repository'
import { Medicament } from '../models/medicament.model'
import { Repository } from 'typeorm'
import {
  MedicamentEntity
} from '../../../common/adapters/storage/typeorm/entities/medicament.entity'
import { Service } from 'typedi'
import { InternalServerError } from '../../../common/exceptions/HttpExceptions'
import {
  getAsyncRepo
} from '../../../common/middlewares/typeorm-transaction-middleware'

@Service()
export class TypeormMedicamentRepository extends MedicamentRepository {

  async find(): Promise<Medicament[]> {
    return this.medicamentRepository.find()
      .then(medicaments => medicaments.map(medicament => medicament.toMedicament()))
  }

  async findById(medicamentId: string): Promise<Medicament | null> {
    return this.medicamentRepository
      .findOne({ where: { id: medicamentId } })
      .then(medicament => medicament?.toMedicament() || null)
  }

  async save(medicament: Medicament): Promise<Medicament> {
    return await this.medicamentRepository
      .save(medicament)
      .then(medicament => this.medicamentRepository.findOne({ where: { id: medicament.id } }))
      .then(medicament => {
        if (!medicament) {
          throw new InternalServerError()
        }
        return medicament.toMedicament()
      })
  }

  private get medicamentRepository(): Repository<MedicamentEntity> {
    return getAsyncRepo(MedicamentEntity)
  }
}
