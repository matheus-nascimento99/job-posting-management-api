import { GetCompanyByIdUseCase } from '@/domain/job-posting-management/application/use-cases/get-company-by-id'
import { PrismaCompaniesRepository } from '@/infra/database/repositories/prisma/companies'

export const makeGetCompanyById = () => {
  const companiesRepository = new PrismaCompaniesRepository()
  const useCase = new GetCompanyByIdUseCase(companiesRepository)

  return useCase
}
