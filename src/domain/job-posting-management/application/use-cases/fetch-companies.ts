import { Either, right } from '@/core/either'
import { PaginationParams } from '@/core/types/pagination-params'

import { Company } from '../../enterprise/entities/company'
import { CompaniesRepository } from '../repositories/companies'

type FetchCompaniesRequestUseCase = PaginationParams

type FetchCompaniesResponseUseCase = Either<{ items: Company[] }, null>

export class FetchCompaniesUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    page,
    limit,
  }: FetchCompaniesRequestUseCase): Promise<FetchCompaniesResponseUseCase> {
    const items = await this.companiesRepository.findMany({ page, limit })

    return right({
      items,
    })
  }
}
