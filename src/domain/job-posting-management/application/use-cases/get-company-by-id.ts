import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { Company } from '../../enterprise/entities/company'
import { CompaniesRepository } from '../repositories/companies'

interface GetCompanyByIdRequestUseCase {
  companyId: string
}

type GetCompanyByIdResponseUseCase = Either<
  { company: Company },
  BadRequestError
>

export class GetCompanyByIdUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    companyId,
  }: GetCompanyByIdRequestUseCase): Promise<GetCompanyByIdResponseUseCase> {
    const company = await this.companiesRepository.findById(
      new UniqueEntityID(companyId),
    )

    if (!company) {
      return left(new BadRequestError('Company not found.'))
    }

    return right({ company })
  }
}
