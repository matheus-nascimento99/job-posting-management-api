import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { Company } from '../../enterprise/entities/company'

export interface CompaniesRepository {
  create(data: Company): Promise<void>
  findById(companyId: UniqueEntityID): Promise<Company | null>
}
