import { PrismaCompaniesRepository } from '@/infra/database/repositories/prisma/companies'
import { PrismaJobPostingsRepository } from '@/infra/database/repositories/prisma/job-postings'

import { CreateJobPostingUseCase } from '../../../../domain/job-posting-management/application/use-cases/create-job-posting-draft'

export const makeCreateJobPostingDraft = () => {
  const companiesRepository = new PrismaCompaniesRepository()
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const useCase = new CreateJobPostingUseCase(
    jobPostingsRepository,
    companiesRepository,
  )

  return useCase
}
