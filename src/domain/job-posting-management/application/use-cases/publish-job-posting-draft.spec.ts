import { faker } from '@faker-js/faker'
import { makeCompany } from 'test/factories/make-company'
import { makeJobPosting } from 'test/factories/make-job-posting'
import { FakeQueue } from 'test/queue/fake-queue'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'
import { InMemoryJobPostingsRepository } from 'test/repositories/in-memory-job-postings'

import { BadRequestError } from '@/core/errors/bad-request'

import { PublishJobPostingDraftUseCase } from './publish-job-posting-draft'

let messagesQueue: FakeQueue
let inMemoryJobPostingsRepository: InMemoryJobPostingsRepository
let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: PublishJobPostingDraftUseCase

describe('Publish job posting draft use case', () => {
  beforeEach(() => {
    messagesQueue = new FakeQueue()
    inMemoryJobPostingsRepository = new InMemoryJobPostingsRepository()
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new PublishJobPostingDraftUseCase(
      inMemoryJobPostingsRepository,
      messagesQueue,
    )
  })

  it('should be able to "publish" job posting draft', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const { id: companyId } = company

    const jobPosting = makeJobPosting({ companyId })
    inMemoryJobPostingsRepository.create(jobPosting)

    const jobPostingId = jobPosting.id.toString()

    const result = await sut.execute({ jobPostingId })

    expect(messagesQueue.items).toHaveLength(1)
    expect(result.isRight()).toEqual(true)
  })

  it('should not be able to "publish" job posting draft with an inexistent job posting draft', async () => {
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
