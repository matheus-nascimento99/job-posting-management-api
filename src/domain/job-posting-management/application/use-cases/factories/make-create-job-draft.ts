import { PrismaJobPostingsRepository } from '../../repositories/prisma/job-postings'
import { CreateJobPostingUseCase } from '../create-job-posting-draft'

export const makeCreateJobDraft = () => {
  const companiesRepository = new PrismaJobPostingsRepository()
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const useCase = new CreateJobPostingUseCase(
    jobPostingsRepository,
    companiesRepository,
  )

  return useCase
}
