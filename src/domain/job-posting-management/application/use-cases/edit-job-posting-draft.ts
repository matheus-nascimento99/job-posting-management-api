import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { JobPostingProps } from '../../enterprise/entities/job-posting'
import { JobPostingsRepository } from '../repositories/job-postings'

type EditJobPostingRequestUseCase = Omit<
  JobPostingProps,
  'companyId' | 'notes' | 'status' | 'createdAt' | 'updatedAt'
> & {
  jobPostingId: string
}

type EditJobPostingResponseUseCase = Either<unknown, BadRequestError>

export class EditJobPostingUseCase {
  constructor(private jobPostingsRepository: JobPostingsRepository) {}

  async execute(
    data: EditJobPostingRequestUseCase,
  ): Promise<EditJobPostingResponseUseCase> {
    const jobPosting = await this.jobPostingsRepository.findById(
      new UniqueEntityID(data.jobPostingId),
    )

    if (!jobPosting) {
      return left(new BadRequestError('Job posting draft not found.'))
    }

    jobPosting.title = data.title
    jobPosting.location = data.location
    jobPosting.description = data.description

    await this.jobPostingsRepository.save(
      new UniqueEntityID(data.jobPostingId),
      jobPosting,
    )

    return right({})
  }
}
