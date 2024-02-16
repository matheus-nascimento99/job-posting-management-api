import request from 'supertest'

import app from '@/app'

describe('Get company by id', () => {
  it('[GET] /company/:company_id', async () => {
    const response = await request(app).get('/company').send()

    const { id, name } = response.body.items[0]

    const result = await request(app).get(`/company/${id}`).send()

    expect(result.statusCode).toEqual(200)
    expect(result.body.item).toMatchObject({
      name,
    })
  })
})
