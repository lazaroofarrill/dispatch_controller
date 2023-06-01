import { RequestHandler } from 'express'
import { AsyncLocalStorage } from 'async_hooks'
import { dataSource } from '../adapters/storage/typeorm/data-source'
import { EntityManager, ObjectLiteral, QueryRunner, Repository } from 'typeorm'
import { EntityTarget } from 'typeorm/browser'

export const asyncLocalStorage: AsyncLocalStorage<{
  [TYPEORM_TRANSACTION_MANAGER]: EntityManager | undefined
  [TYPEORM_QUERY_RUNNER]: QueryRunner | undefined
}> = new AsyncLocalStorage()

export const getAsyncRepo = <Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> => asyncLocalStorage
  .getStore()![TYPEORM_TRANSACTION_MANAGER]!
  .getRepository(target as any)


export const TYPEORM_TRANSACTION_MANAGER = 'TYPEORM_TRANSACTION_MANAGER'
export const TYPEORM_QUERY_RUNNER = 'TYPEORM_QUERY_RUNNER'

export const typeormTransactionMiddleware: RequestHandler =
  (req, res, next) =>
    asyncLocalStorage.run({
        TYPEORM_QUERY_RUNNER: undefined,
        TYPEORM_TRANSACTION_MANAGER: undefined
      },
      async () => {
        const queryRunner = dataSource.createQueryRunner()
        await queryRunner.startTransaction()
        asyncLocalStorage.getStore()![TYPEORM_TRANSACTION_MANAGER] = queryRunner.manager
        asyncLocalStorage.getStore()![TYPEORM_QUERY_RUNNER] = queryRunner

        res.on('finish', async () => {
          return queryRunner.commitTransaction()
        })

        await next()
      })

