import { Either, right } from '@/core/either'

import {
  StorageFetcher,
  StorageFetcherResponse,
} from '../storage/storage-fetcher'

type FetchJobsFeedUseCaseResponse = Either<
  {
    feed: StorageFetcherResponse[]
  },
  null
>

export class FetchJobsFeedUseCase {
  constructor(private storageFetcher: StorageFetcher) {}

  async execute(): Promise<FetchJobsFeedUseCaseResponse> {
    const feed = await this.storageFetcher.fetch()

    return right({ feed })
  }
}
