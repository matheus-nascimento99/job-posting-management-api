import { Request, Response } from 'express'
import z from 'zod'

export const fetchCompanies = async (req: Request, res: Response) => {
  const schema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
  })

  const data = schema.parse(req.body)
}
