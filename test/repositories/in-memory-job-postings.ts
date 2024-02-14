import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { JobPostingsRepository } from '@/domain/job-posting-management/application/repositories/job-postings'
import { JobPosting } from '@/domain/job-posting-management/enterprise/entities/job-posting'

export class InMemoryJobPostingsRepository implements JobPostingsRepository {
  public items: JobPosting[] = []
  async create(jobPosting: JobPosting) {
    this.items.push(jobPosting)
  }

  async findById(jobPostingId: UniqueEntityID) {
    const jobPosting = this.items.find(
      (item) => item.id.toString() === jobPostingId.toString(),
    )

    if (!jobPosting) {
      return null
    }

    return jobPosting
  }

  async save(jobPostingId: UniqueEntityID, data: JobPosting): Promise<void> {
    const jobPostingIndex = this.items.findIndex(
      (item) => item.id.toString() === jobPostingId.toString(),
    )

    this.items[jobPostingIndex] = data
  }
}
