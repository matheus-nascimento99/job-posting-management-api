import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

import { env } from '@/env'

import { StorageFetcher, StorageFetcherResponse } from '../storage-fetcher'

export class S3Fetcher implements StorageFetcher {
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      region: env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async fetch(): Promise<StorageFetcherResponse[]> {
    const key =
      env.NODE_ENV === 'test' || env.NODE_ENV === 'development'
        ? 'feed-test-e2e.json'
        : 'feed.json'

    const command = new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    })

    try {
      const response = await this.client.send(command)
      // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
      const body = response.Body

      if (!body) {
        return []
      }

      const result = await body.transformToString()
      const json = JSON.parse(result)

      return json
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
