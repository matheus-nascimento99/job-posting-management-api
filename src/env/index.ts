import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error(result.error.flatten())
  throw new Error('Invalid environment variables.')
}

export const env = result.data
