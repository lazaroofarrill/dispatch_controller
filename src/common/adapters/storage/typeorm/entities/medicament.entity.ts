import {
  Medicament
} from '../../../../../modules/medicaments/models/medicament.model'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DroneMedicamentJoinEntity } from './drone-medicament-join.entity'
import { Relation } from 'typeorm/browser'

@Entity('medicaments')
export class MedicamentEntity implements Medicament {
  @Column('varchar')
  code: string

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  image: string

  @Column('varchar')
  name: string

  @Column('double precision')
  weight: number

  @OneToMany(() => DroneMedicamentJoinEntity,
    (droneToMedicamentJoin) => droneToMedicamentJoin.medicament)
  droneMedicamentJoin: Relation<DroneMedicamentJoinEntity[]>

  toMedicament(): Medicament {
    const { id, code, image, name, weight } = this
    return {
      code, id, image, name, weight
    }
  }
}
