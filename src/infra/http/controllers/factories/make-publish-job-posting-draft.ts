import { PublishJobPostingDraftUseCase } from '@/domain/job-posting-management/application/use-cases/publish-job-posting-draft'
import { PrismaJobPostingsRepository } from '@/infra/database/repositories/prisma/job-postings'

export const makePublishJobPostingDraft = () => {
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const useCase = new PublishJobPostingDraftUseCase(jobPostingsRepository)

  return useCase
}
