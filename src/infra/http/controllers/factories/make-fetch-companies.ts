import { FetchCompaniesUseCase } from '@/domain/job-posting-management/application/use-cases/fetch-companies'
import { PrismaCompaniesRepository } from '@/infra/database/repositories/prisma/companies'

export const makeFetchCompanies = () => {
  const companiesRepository = new PrismaCompaniesRepository()
  const useCase = new FetchCompaniesUseCase(companiesRepository)

  return useCase
}
