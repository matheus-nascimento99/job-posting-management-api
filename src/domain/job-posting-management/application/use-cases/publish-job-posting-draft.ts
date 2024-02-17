import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { MessagesQueue } from '../queue/messages-queue'
import { JobPostingsRepository } from '../repositories/job-postings'

type PublishJobPostingDraftRequestUseCase = {
  jobPostingId: string
}

type PublishJobPostingDraftResponseUseCase = Either<unknown, BadRequestError>

export class PublishJobPostingDraftUseCase {
  constructor(
    private jobPostingsRepository: JobPostingsRepository,
    private messagesQueue: MessagesQueue,
  ) {}

  async execute({
    jobPostingId,
  }: PublishJobPostingDraftRequestUseCase): Promise<PublishJobPostingDraftResponseUseCase> {
    const jobPosting = await this.jobPostingsRepository.findById(
      new UniqueEntityID(jobPostingId),
    )

    if (!jobPosting) {
      return left(new BadRequestError('Job posting draft not found.'))
    }

    await this.messagesQueue.send(jobPosting)

    return right({})
  }
}
