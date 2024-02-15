import { Company as PrismaCompany, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Company } from '@/domain/job-posting-management/enterprise/entities/company'

export class PrismaCompanyMapper {
  static toDomain(raw: PrismaCompany) {
    return Company.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
    return {
      name: company.name,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }
  }
}
