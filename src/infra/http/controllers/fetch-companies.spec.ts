import request from 'supertest'

import app from '@/app'

describe('Fetch companies', () => {
  it('[GET] /company', async () => {
    const result = await request(app).get('/company').send()

    expect(result.statusCode).toEqual(200)
    expect(result.body.items).toHaveLength(3)
  })
})
