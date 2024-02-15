import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { JobPosting } from '@/domain/job-posting-management/enterprise/entities/job-posting'

import { JobPostingsRepository } from '../job-postings'

export class PrismaJobPostingsRepository implements JobPostingsRepository {
  async create(data: JobPosting) {
    throw new Error('Method not implemented.')
  }

  async findById(jobPostingId: UniqueEntityID) {
    throw new Error('Method not implemented.')
  }

  async save(jobPostingId: UniqueEntityID, data: JobPosting) {
    throw new Error('Method not implemented.')
  }

  async delete(jobPostingId: UniqueEntityID) {
    throw new Error('Method not implemented.')
  }
}
