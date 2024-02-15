import { Company } from '@/domain/job-posting-management/enterprise/entities/company'

export class CompanyPresenter {
  static toHTTP(company: Company) {
    return {
      id: company.id.toString(),
      name: company.name,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }
  }
}
