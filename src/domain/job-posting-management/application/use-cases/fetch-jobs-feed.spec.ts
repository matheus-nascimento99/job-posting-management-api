import { FakeFetcher } from 'test/storage/fake-fetcher'

import { FetchJobsFeedUseCase } from './fetch-jobs-feed'

let fakerStorageFetcher: FakeFetcher
let sut: FetchJobsFeedUseCase

describe('Fetch jobs feed use case', () => {
  beforeEach(() => {
    fakerStorageFetcher = new FakeFetcher()
    sut = new FetchJobsFeedUseCase(fakerStorageFetcher)
  })

  it('should be able to fetch jobs feed', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toEqual(true)
    expect(result.value?.feed).toHaveLength(5)
  })
})
