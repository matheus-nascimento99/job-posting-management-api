import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().min(1),
  AWS_DEFAULT_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_BUCKET_NAME: z.string().min(1),
  AWS_SQS_URL: z.string().url().min(1),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error(result.error.flatten())
  throw new Error('Invalid environment variables.')
}

export const env = result.data
