import { DeleteJobPostingDraftUseCase } from '@/domain/job-posting-management/application/use-cases/delete-job-posting-draft'
import { PrismaJobPostingsRepository } from '@/infra/database/repositories/prisma/job-postings'

export const makeDeleteJobPostingDraft = () => {
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const useCase = new DeleteJobPostingDraftUseCase(jobPostingsRepository)

  return useCase
}
