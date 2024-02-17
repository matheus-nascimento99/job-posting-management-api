import { SQSQueue } from '@/domain/job-posting-management/application/queue/sqs/queue'
import { PublishJobPostingDraftUseCase } from '@/domain/job-posting-management/application/use-cases/publish-job-posting-draft'
import { PrismaJobPostingsRepository } from '@/infra/database/repositories/prisma/job-postings'

export const makePublishJobPostingDraft = () => {
  const jobPostingsRepository = new PrismaJobPostingsRepository()
  const messagesQueue = new SQSQueue()
  const useCase = new PublishJobPostingDraftUseCase(
    jobPostingsRepository,
    messagesQueue,
  )

  return useCase
}
