import { Either, left, right } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import {
  JobPosting,
  JobPostingProps,
} from '../../enterprise/entities/job-posting'
import { CompaniesRepository } from '../repositories/companies'
import { JobPostingsRepository } from '../repositories/job-postings'

type CreateJobPostingRequestUseCase = Omit<
  JobPostingProps,
  'companyId' | 'status' | 'createdAt' | 'updatedAt'
> & {
  companyId: string
}

type CreateJobPostingResponseUseCase = Either<unknown, BadRequestError>

export class CreateJobPostingUseCase {
  constructor(
    private jobPostingsRepository: JobPostingsRepository,
    private companiesRepository: CompaniesRepository,
  ) {}

  async execute(
    data: CreateJobPostingRequestUseCase,
  ): Promise<CreateJobPostingResponseUseCase> {
    const company = await this.companiesRepository.findById(
      new UniqueEntityID(data.companyId),
    )

    if (!company) {
      return left(new BadRequestError('Company not found.'))
    }

    const jobPosting = JobPosting.create({ ...data, companyId: company.id })

    await this.jobPostingsRepository.create(jobPosting)

    return right({})
  }
}
