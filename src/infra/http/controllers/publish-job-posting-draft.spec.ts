import request from 'supertest'
import { makePrismaJobPosting } from 'test/factories/make-job-posting'

import app from '@/app'

describe('Publish job posting', () => {
  it('[PUT] /job/:job_id/publish', async () => {
    const response = await request(app).get('/company').send()

    const { id } = response.body.items[0]

    const jobPosting = await makePrismaJobPosting({ companyId: id })

    const result = await request(app)
      .put(`/job/${jobPosting.id.toString()}/publish`)
      .send()

    expect(result.statusCode).toEqual(204)
  })
})
