import { S3Fetcher } from '@/domain/job-posting-management/application/storage/s3/fetcher'
import { FetchJobsFeedUseCase } from '@/domain/job-posting-management/application/use-cases/fetch-jobs-feed'

export const makeFetchJobsFeed = () => {
  const storageFetcher = new S3Fetcher()
  const useCase = new FetchJobsFeedUseCase(storageFetcher)

  return useCase
}
