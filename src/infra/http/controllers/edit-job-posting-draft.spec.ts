import { faker } from '@faker-js/faker'
import request from 'supertest'
import { makePrismaJobPosting } from 'test/factories/make-job-posting'

import app from '@/app'

describe('Edit job posting', () => {
  it('[PUT] /job/:job_id', async () => {
    const response = await request(app).get('/company').send()

    const { id } = response.body.items[0]

    const jobPosting = await makePrismaJobPosting({ companyId: id })

    const result = await request(app)
      .put(`/job/${jobPosting.id.toString()}`)
      .send({
        description: faker.lorem.text(),
        location: faker.location.streetAddress(),
        title: faker.lorem.sentence(5),
      })

    expect(result.statusCode).toEqual(204)
  })
})
