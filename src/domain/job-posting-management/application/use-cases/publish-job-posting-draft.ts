import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { JobPostingStatus } from '../../enterprise/entities/job-posting'
import { JobPostingsRepository } from '../repositories/job-postings'

type PublishJobPostingDraftRequestUseCase = {
  jobPostingId: string
}

type PublishJobPostingDraftResponseUseCase = Either<unknown, BadRequestError>

export class PublishJobPostingDraftUseCase {
  constructor(private jobPostingsRepository: JobPostingsRepository) {}

  async execute({
    jobPostingId,
  }: PublishJobPostingDraftRequestUseCase): Promise<PublishJobPostingDraftResponseUseCase> {
    const jobPosting = await this.jobPostingsRepository.findById(
      new UniqueEntityID(jobPostingId),
    )

    if (!jobPosting) {
      return left(new BadRequestError('Job posting not found.'))
    }

    jobPosting.status = JobPostingStatus.published
    await this.jobPostingsRepository.save(
      new UniqueEntityID(jobPostingId),
      jobPosting,
    )

    return right({})
  }
}
