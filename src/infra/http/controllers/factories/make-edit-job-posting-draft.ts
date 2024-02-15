import { EditJobPostingUseCase } from '@/domain/job-posting-management/application/use-cases/edit-job-posting-draft'
import { PrismaJobPostingsRepository } from '@/infra/database/repositories/prisma/job-postings'

export const makeEditJobPostingDraft = () => {
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const useCase = new EditJobPostingUseCase(jobPostingsRepository)

  return useCase
}
