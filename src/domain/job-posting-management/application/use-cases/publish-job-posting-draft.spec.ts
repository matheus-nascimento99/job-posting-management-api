import { faker } from '@faker-js/faker'
import { makeCompany } from 'test/factories/make-company'
import { makeJobPosting } from 'test/factories/make-job-posting'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'
import { InMemoryJobPostingsRepository } from 'test/repositories/in-memory-job-postings'

import { BadRequestError } from '@/core/errors/bad-request'

import { PublishJobPostingDraftUseCase } from './publish-job-posting-draft'

let inMemoryJobPostingsRepository: InMemoryJobPostingsRepository
let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: PublishJobPostingDraftUseCase

describe('Publish job posting draft use case', () => {
  beforeEach(() => {
    inMemoryJobPostingsRepository = new InMemoryJobPostingsRepository()
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new PublishJobPostingDraftUseCase(inMemoryJobPostingsRepository)
  })

  it('should be able to publish job posting draft', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    const jobPosting = makeJobPosting({ companyId })
    inMemoryJobPostingsRepository.create(jobPosting)

    const jobPostingId = jobPosting.id.toString()

    const result = await sut.execute({ jobPostingId })
    expect(result.isRight()).toEqual(true)
  })

  it('should not be able to publish job posting draft with an inexistent job posting', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    const jobPosting = makeJobPosting({ companyId })
    inMemoryJobPostingsRepository.create(jobPosting)

    const jobPostingId = faker.string.uuid()

    const result = await sut.execute({ jobPostingId })
    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(BadRequestError)
  })
})
