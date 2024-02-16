import request from 'supertest'
import { makePrismaJobPosting } from 'test/factories/make-job-posting'

import app from '@/app'

describe('Delete job posting', () => {
  it('[DELETE] /job/:job_id', async () => {
    const response = await request(app).get('/company').send()

    const { id } = response.body.items[0]

    const jobPosting = await makePrismaJobPosting({ companyId: id })

    const result = await request(app)
      .delete(`/job/${jobPosting.id.toString()}`)
      .send()

    expect(result.statusCode).toEqual(200)
  })
})
