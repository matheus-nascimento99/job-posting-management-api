import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import {
  JobPosting,
  JobPostingProps,
} from '@/domain/job-posting-management/enterprise/entities/job-posting'

export const makeJobPosting = (
  override: Partial<JobPostingProps> = {},
  id?: UniqueEntityID,
) => {
  const jobPosting = JobPosting.create(
    {
      companyId: new UniqueEntityID(faker.string.uuid()),
      description: faker.lorem.text(),
      location: faker.location.streetAddress(),
      title: faker.lorem.sentence(5),
      notes: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return jobPosting
}
