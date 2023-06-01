import {
  Medicament
} from '../../../../../modules/medicaments/models/medicament.model'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
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
}
