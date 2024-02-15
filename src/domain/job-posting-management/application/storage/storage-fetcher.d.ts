import { JobPostingProps } from '@/domain/job-posting-management/enterprise/entities/job-posting'

export type StorageFetcherResponse = Omit<
  JobPostingProps,
  'companyId' | 'location' | 'notes' | 'status' | 'updatedAt'
> & {
  id: string
  companyName: string
}

export interface StorageFetcher {
  fetch(): Promise<StorageFetcherResponse[]>
}
