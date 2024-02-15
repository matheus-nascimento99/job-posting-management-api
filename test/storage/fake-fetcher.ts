import { faker } from '@faker-js/faker'

import {
  StorageFetcher,
  StorageFetcherResponse,
} from '@/domain/job-posting-management/application/storage/storage-fetcher'

export class FakeFetcher implements StorageFetcher {
  private jobs: StorageFetcherResponse[] = []
  async fetch() {
    Array.from({ length: 5 }, () => {
      return this.jobs.push({
        id: faker.string.uuid(),
        companyName: faker.company.buzzPhrase(),
        title: faker.lorem.sentence(5),
        description: faker.lorem.text(),
        createdAt: new Date(),
      })
    })

    return this.jobs
  }
}
