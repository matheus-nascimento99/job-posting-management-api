import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { JobPostingsRepository } from '@/domain/job-posting-management/application/repositories/job-postings'
import { JobPosting } from '@/domain/job-posting-management/enterprise/entities/job-posting'
import { prisma } from '@/lib/prisma'

import { PrismaJobPostingMapper } from '../../mappers/prisma/jop-posting'

export class PrismaJobPostingsRepository implements JobPostingsRepository {
  async create(data: JobPosting) {
    const jobPosting = PrismaJobPostingMapper.toPrisma(data)

    await prisma.job.create({ data: jobPosting })
  }

  async findById(jobPostingId: UniqueEntityID) {
    const jobPosting = await prisma.job.findUnique({
      where: {
        id: jobPostingId.toString(),
      },
    })

    if (!jobPosting) {
      return null
    }

    return PrismaJobPostingMapper.toDomain(jobPosting)
  }

  async save(jobPostingId: UniqueEntityID, data: JobPosting) {
    const jobPosting = PrismaJobPostingMapper.toPrisma(data)

    await prisma.job.update({
      where: {
        id: jobPostingId.toString(),
      },
      data: jobPosting,
    })
  }

  async delete(jobPostingId: UniqueEntityID) {
    await prisma.job.delete({
      where: {
        id: jobPostingId.toString(),
      },
    })
  }
}
