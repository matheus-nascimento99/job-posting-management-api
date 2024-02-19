const { PrismaClient } = require("@prisma/client");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const prisma = new PrismaClient()

module.exports.run = async () => {
  const jobs = await prisma.job.findMany({where: {status: 'published'}})

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: 'feed-test-e2e.json',
    Body: JSON.stringify(jobs),
    ContentType: 'application/json'
  })

  try {
    await client.send(command)
  } catch (error) {
    console.log(error)
    throw error
  }
};
