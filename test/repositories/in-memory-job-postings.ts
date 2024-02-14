import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { JobPostingsRepository } from '@/domain/job-posting-management/application/repositories/job-postings'
import { JobPosting } from '@/domain/job-posting-management/enterprise/entities/job-posting'

export class InMemoryJobPostingsRepository implements JobPostingsRepository {
  public items: JobPosting[] = []
  async create(jobPosting: JobPosting) {
    this.items.push(jobPosting)
  }

  async findById(jobPostingId: UniqueEntityID) {
    const jobPosting = this.items.find((item) => item.id === jobPostingId)

    if (!jobPosting) {
      return null
    }

    return jobPosting
  }
}
