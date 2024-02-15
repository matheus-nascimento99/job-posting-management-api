import { PaginationParams } from '@/core/types/pagination-params'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { CompaniesRepository } from '@/domain/job-posting-management/application/repositories/companies'
import { prisma } from '@/lib/prisma'

import { PrismaCompanyMapper } from '../../mappers/prisma/company'

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create() {
    throw new Error('Method not implemented.')
  }

  async findMany({ page, limit }: PaginationParams) {
    const companies = await prisma.company.findMany({
      skip: (page - 1) * limit,
      take: page * limit,
    })

    return companies.map((company) => PrismaCompanyMapper.toDomain(company))
  }

  async findById(companyId: UniqueEntityID) {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId.toString(),
      },
    })

    if (!company) {
      return null
    }

    return PrismaCompanyMapper.toDomain(company)
  }
}
