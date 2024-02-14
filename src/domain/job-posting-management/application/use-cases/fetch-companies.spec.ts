import { makeCompany } from 'test/factories/make-company'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'

import { FetchCompaniesUseCase } from './fetch-companies'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: FetchCompaniesUseCase

describe('Fetch companies use case', () => {
  beforeEach(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new FetchCompaniesUseCase(inMemoryCompaniesRepository)
  })

  it('should be able to fetch companies', async () => {
    inMemoryCompaniesRepository.create(makeCompany())
    inMemoryCompaniesRepository.create(makeCompany())
    inMemoryCompaniesRepository.create(makeCompany())

    const result = await sut.execute({ limit: 3, page: 1 })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.items).toHaveLength(3)
  })

  it('should be able to fetch companies paginated', async () => {
    inMemoryCompaniesRepository.create(makeCompany())
    inMemoryCompaniesRepository.create(makeCompany())
    inMemoryCompaniesRepository.create(makeCompany())

    const result = await sut.execute({ limit: 2, page: 2 })

    expect(result.isRight()).toEqual(true)
    expect(result.value?.items).toHaveLength(1)
  })
})
