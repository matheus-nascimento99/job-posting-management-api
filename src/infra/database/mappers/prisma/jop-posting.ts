import { Job as PrismaJobPosting, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import {
  JobPosting,
  JobPostingStatus,
} from '@/domain/job-posting-management/enterprise/entities/job-posting'

export class PrismaJobPostingMapper {
  static toDomain(raw: PrismaJobPosting) {
    return JobPosting.create(
      {
        companyId: new UniqueEntityID(raw.companyId),
        title: raw.title,
        description: raw.description,
        location: raw.location,
        notes: raw.notes,
        status: raw.status as JobPostingStatus,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(jobPosting: JobPosting): Prisma.JobUncheckedCreateInput {
    return {
      id: jobPosting.id.toString(),
      companyId: jobPosting.companyId.toString(),
      title: jobPosting.title,
      description: jobPosting.description,
      location: jobPosting.location,
      notes: jobPosting.location,
      status: jobPosting.status,
      createdAt: jobPosting.createdAt,
      updatedAt: jobPosting.updatedAt,
    }
  }
}
