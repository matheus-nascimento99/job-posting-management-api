import { faker } from '@faker-js/faker'
import { makeCompany } from 'test/factories/make-company'
import { makeJobPosting } from 'test/factories/make-job-posting'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'
import { InMemoryJobPostingsRepository } from 'test/repositories/in-memory-job-postings'

import { BadRequestError } from '@/core/errors/bad-request'

import { JobPostingStatus } from '../../enterprise/entities/job-posting'
import { ArchiveActiveJobPostingUseCase } from './archive-active-job-posting'

let inMemoryJobPostingsRepository: InMemoryJobPostingsRepository
let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: ArchiveActiveJobPostingUseCase

describe('Publish job posting draft use case', () => {
  beforeEach(() => {
    inMemoryJobPostingsRepository = new InMemoryJobPostingsRepository()
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new ArchiveActiveJobPostingUseCase(inMemoryJobPostingsRepository)
  })

  it('should be able to archive an active job posting', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    const jobPosting = makeJobPosting({ companyId })
    inMemoryJobPostingsRepository.create(jobPosting)

    const jobPostingId = jobPosting.id.toString()

    const result = await sut.execute({ jobPostingId })
    expect(result.isRight()).toEqual(true)
    expect(inMemoryJobPostingsRepository.items[0]).toMatchObject({
      status: JobPostingStatus.archived,
    })
  })

  it('should not be able to archive an active job posting with an inexistent active job posting', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    inMemoryJobPostingsRepository.create(makeJobPosting({ companyId }))

    const jobPostingId = faker.string.uuid()

    const result = await sut.execute({ jobPostingId })
    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(BadRequestError)
  })
})
