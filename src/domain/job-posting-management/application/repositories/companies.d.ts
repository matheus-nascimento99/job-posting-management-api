import { PaginationParams } from '@/core/types/pagination-params'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { Company } from '../../enterprise/entities/company'

export interface CompaniesRepository {
  create(data: Company): Promise<void>
  findMany(paginationParams: PaginationParams): Promise<Company[]>
  findById(companyId: UniqueEntityID): Promise<Company | null>
}
