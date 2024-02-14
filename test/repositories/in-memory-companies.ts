import { PaginationParams } from '@/core/types/pagination-params'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { CompaniesRepository } from '@/domain/job-posting-management/application/repositories/companies'
import { Company } from '@/domain/job-posting-management/enterprise/entities/company'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []
  async create(company: Company) {
    this.items.push(company)
  }

  async findById(companyId: UniqueEntityID) {
    const company = this.items.find(
      (item) => item.id.toString() === companyId.toString(),
    )

    if (!company) {
      return null
    }

    return company
  }

  async findMany({ page, limit }: PaginationParams) {
    const companies = this.items.slice((page - 1) * limit, page * limit)

    return companies
  }
}
