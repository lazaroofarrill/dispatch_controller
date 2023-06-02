import { Container } from 'typedi'
import { DataSource } from 'typeorm'
import { dataSource } from '../../common/adapters/storage/typeorm/data-source'

Container.set(DataSource, dataSource)
