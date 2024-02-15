import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { BadRequestError } from '@/core/errors/bad-request'

import { makeCreateJobPostingDraft } from './factories/make-create-job-posting-draft'

export const createJobPostingDraft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    companyId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    notes: z.string().nullable().optional(),
  })

  const data = schema.parse(req.body)

  const createJobPostingDraftUseCase = makeCreateJobPostingDraft()

  try {
    const result = await createJobPostingDraftUseCase.execute(data)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case BadRequestError:
          return res.status(400).json({ message: error.message })
        default:
          next(error)
      }
    }

    return res.status(201).send()
  } catch (error) {
    next(error)
  }
}
