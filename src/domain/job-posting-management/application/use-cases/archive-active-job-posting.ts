import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { JobPostingStatus } from '../../enterprise/entities/job-posting'
import { JobPostingsRepository } from '../repositories/job-postings'

type ArchiveActiveJobPostingRequestUseCase = {
  jobPostingId: string
}

type ArchiveActiveJobPostingResponseUseCase = Either<unknown, BadRequestError>

export class ArchiveActiveJobPostingUseCase {
  constructor(private jobPostingsRepository: JobPostingsRepository) {}

  async execute({
    jobPostingId,
  }: ArchiveActiveJobPostingRequestUseCase): Promise<ArchiveActiveJobPostingResponseUseCase> {
    const jobPosting = await this.jobPostingsRepository.findById(
      new UniqueEntityID(jobPostingId),
    )

    if (!jobPosting) {
      return left(new BadRequestError('Active job posting not found.'))
    }

    jobPosting.status = JobPostingStatus.archived

    await this.jobPostingsRepository.save(
      new UniqueEntityID(jobPostingId),
      jobPosting,
    )

    return right({})
  }
}
