import { PaginationParams } from '@/core/types/pagination-params'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { CompaniesRepository } from '../companies'

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create() {
    throw new Error('Method not implemented.')
  }

  async findMany({ page, limit }: PaginationParams) {
    throw new Error('Method not implemented.')
  }

  async findById(companyId: UniqueEntityID) {
    throw new Error('Method not implemented.')
  }
}
