import { ArchiveActiveJobPostingUseCase } from '@/domain/job-posting-management/application/use-cases/archive-active-job-posting'
import { PrismaJobPostingsRepository } from '@/infra/database/repositories/prisma/job-postings'

export const makeArchiveActiveJobPosting = () => {
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const useCase = new ArchiveActiveJobPostingUseCase(jobPostingsRepository)

  return useCase
}
