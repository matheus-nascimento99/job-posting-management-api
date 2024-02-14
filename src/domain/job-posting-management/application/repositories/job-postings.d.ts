import { JobPosting } from '../../enterprise/entities/job-posting'

export interface JobPostingsRepository {
  create(data: JobPosting): Promise<void>
  findById(jobPostingId: UniqueEntityID): Promise<JobPosting | null>
}
