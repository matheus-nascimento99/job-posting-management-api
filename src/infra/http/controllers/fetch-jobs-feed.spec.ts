import request from 'supertest'

import app from '@/app'

describe('Fetch jobs feed', () => {
  it('[GET] /feed', async () => {
    const result = await request(app).get('/feed').send()
    expect(result.statusCode).toEqual(200)
    expect(result.body.items).toHaveLength(5)
  })
})
