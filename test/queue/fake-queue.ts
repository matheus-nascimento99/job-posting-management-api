import { MessagesQueue } from '@/domain/job-posting-management/application/queue/messages-queue'
import { JobPosting } from '@/domain/job-posting-management/enterprise/entities/job-posting'

type MessageQueueProps = {
  id: string
  title: string
  description: string
}

export class FakeQueue implements MessagesQueue {
  public items: MessageQueueProps[] = []
  async send({ id, title, description }: JobPosting): Promise<void> {
    this.items.push({
      id: id.toString(),
      title,
      description,
    })
  }
}
