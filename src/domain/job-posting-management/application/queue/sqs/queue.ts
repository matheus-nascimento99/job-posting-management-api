import { randomUUID } from 'node:crypto'

import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'

import { JobPosting } from '@/domain/job-posting-management/enterprise/entities/job-posting'
import { env } from '@/env'

import { MessagesQueue } from '../messages-queue'

export class SQSQueue implements MessagesQueue {
  private client: SQSClient
  constructor() {
    this.client = new SQSClient({
      region: env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async send({ id, title, description }: JobPosting): Promise<void> {
    console.log(id, title, description)
    const command = new SendMessageCommand({
      QueueUrl: env.AWS_SQS_URL,
      MessageBody: JSON.stringify({
        id: id.toString(),
        title,
        description,
      }),
      DelaySeconds: 0,
      MessageDeduplicationId: randomUUID(),
      MessageGroupId: 'register',
    })

    try {
      await this.client.send(command)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
