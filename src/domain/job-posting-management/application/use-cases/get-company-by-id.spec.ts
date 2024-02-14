import { faker } from '@faker-js/faker'
import { makeCompany } from 'test/factories/make-company'
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies'

import { BadRequestError } from '@/core/errors/bad-request'

import { GetCompanyByIdUseCase } from './get-company-by-id'

let inMemoryCompaniesRepository: InMemoryCompaniesRepository
let sut: GetCompanyByIdUseCase

describe('Get company by id', () => {
  beforeEach(() => {
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository()
    sut = new GetCompanyByIdUseCase(inMemoryCompaniesRepository)
  })

  it('should be able to get company by id', async () => {
    const company = makeCompany()
    inMemoryCompaniesRepository.create(company)

    const companyId = company.id.toString()

    const result = await sut.execute({ companyId })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toMatchObject({
      company: {
        id: company.id,
      },
    })
  })

  it('should not be able to get an inexistent company', async () => {
    const companyId = faker.string.uuid()

    const result = await sut.execute({ companyId })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(BadRequestError)
  })
})
