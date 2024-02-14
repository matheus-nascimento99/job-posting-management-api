import { faker } from '@faker-js/faker'
import { makeCompany } from 'test/factories/make-company'
import { makeJobPosting } from 'test/factories/make-job-posting'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'
import { InMemoryJobPostingsRepository } from 'test/repositories/in-memory-job-postings'

import { BadRequestError } from '@/core/errors/bad-request'

import { DeleteJobPostingUseCase } from './delete-job-posting-draft'

let inMemoryJobPostingsRepository: InMemoryJobPostingsRepository
let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: DeleteJobPostingUseCase

describe('Create job posting use case', () => {
  beforeEach(() => {
    inMemoryJobPostingsRepository = new InMemoryJobPostingsRepository()
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new DeleteJobPostingUseCase(inMemoryJobPostingsRepository)
  })

  it('should be able to delete a job posting draft', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    const jobPosting = makeJobPosting({ companyId })
    inMemoryJobPostingsRepository.create(jobPosting)

    const jobPostingId = jobPosting.id.toString()

    const result = await sut.execute({
      jobPostingId,
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryJobPostingsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a job posting draft with an inexistent job posting draft', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    inMemoryJobPostingsRepository.create(makeJobPosting({ companyId }))

    const jobPostingId = faker.string.uuid()

    const result = await sut.execute({
      jobPostingId,
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(BadRequestError)
  })
})
