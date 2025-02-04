import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

import { JobPosting } from '../../enterprise/entities/job-posting'

export interface JobPostingsRepository {
  create(data: JobPosting): Promise<void>
  findById(jobPostingId: UniqueEntityID): Promise<JobPosting | null>
  save(jobPostingId: UniqueEntityID, data: JobPosting): Promise<void>
  delete(jobPostingId: UniqueEntityID): Promise<void>
}
