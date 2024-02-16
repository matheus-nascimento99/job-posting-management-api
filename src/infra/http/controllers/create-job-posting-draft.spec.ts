import { faker } from '@faker-js/faker'
import request from 'supertest'

import app from '@/app'

describe('Create job posting', () => {
  it('[POST] /job', async () => {
    const response = await request(app).get('/company').send()

    const { id } = response.body.items[0]

    const result = await request(app)
      .post('/job')
      .send({
        companyId: id,
        description: faker.lorem.text(),
        location: faker.location.streetAddress(),
        title: faker.lorem.sentence(5),
        notes: faker.lorem.text(),
      })

    expect(result.statusCode).toEqual(201)
  })
})
