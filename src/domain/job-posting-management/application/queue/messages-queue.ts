import { JobPosting } from '../../enterprise/entities/job-posting'

export interface MessagesQueue {
  send(jobPosting: JobPosting): Promise<void>
}
