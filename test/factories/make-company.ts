import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import {
  Company,
  CompanyProps,
} from '@/domain/job-posting-management/enterprise/entities/company'

export const makeCompany = (
  override: Partial<CompanyProps> = {},
  id?: UniqueEntityID,
) => {
  const company = Company.create(
    {
      name: faker.company.buzzPhrase(),
      ...override,
    },
    id,
  )

  return company
}
