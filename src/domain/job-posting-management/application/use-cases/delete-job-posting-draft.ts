import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { JobPostingsRepository } from '../repositories/job-postings'

type DeleteJobPostingRequestUseCase = {
  jobPostingId: string
}

type DeleteJobPostingResponseUseCase = Either<unknown, BadRequestError>

export class DeleteJobPostingDraftUseCase {
  constructor(private jobPostingsRepository: JobPostingsRepository) {}

  async execute({
    jobPostingId,
  }: DeleteJobPostingRequestUseCase): Promise<DeleteJobPostingResponseUseCase> {
    const jobPosting = await this.jobPostingsRepository.findById(
      new UniqueEntityID(jobPostingId),
    )

    if (!jobPosting) {
      return left(new BadRequestError('Job posting draft not found.'))
    }

    await this.jobPostingsRepository.delete(jobPosting.id)

    return right({})
  }
}
