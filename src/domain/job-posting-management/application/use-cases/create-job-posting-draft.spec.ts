import { faker } from '@faker-js/faker'
import { makeCompany } from 'test/factories/make-company'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'
import { InMemoryJobPostingsRepository } from 'test/repositories/in-memory-job-postings'

import { BadRequestError } from '@/core/errors/bad-request'

import { CreateJobPostingUseCase } from './create-job-posting-draft'

let inMemoryJobPostingsRepository: InMemoryJobPostingsRepository
let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: CreateJobPostingUseCase

describe('Create job posting use case', () => {
  beforeEach(() => {
    inMemoryJobPostingsRepository = new InMemoryJobPostingsRepository()
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new CreateJobPostingUseCase(
      inMemoryJobPostingsRepository,
      inMemoryCompaniesRepository,
    )
  })

  it('should be able to create a job posting draft', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const result = await sut.execute({
      companyId: company.id.toString(),
      description: faker.lorem.text(),
      location: faker.location.streetAddress(),
      title: faker.lorem.sentence(5),
      notes: faker.lorem.text(),
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryJobPostingsRepository.items).toHaveLength(1)
  })

  it('should not be able to create a job posting draft with an inexistent company', async () => {
    const result = await sut.execute({
      companyId: faker.string.uuid(),
      description: faker.lorem.text(),
      location: faker.location.streetAddress(),
      title: faker.lorem.sentence(5),
      notes: faker.lorem.text(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(BadRequestError)
  })
})
