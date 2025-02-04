import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { BadRequestError } from '@/core/errors/bad-request'

import { makeEditJobPostingDraft } from './factories/make-edit-job-posting-draft'

export const editJobPostingDraft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const paramsSchema = z.object({
    job_id: z.string().uuid(),
  })

  const bodySchema = z.object({
    title: z.string().min(1),
    location: z.string().min(1),
    description: z.string().min(1),
  })

  const bodyData = bodySchema.parse(req.body)
  const paramsData = paramsSchema.parse(req.params)

  const editJobPostingDraftUseCase = makeEditJobPostingDraft()

  try {
    const result = await editJobPostingDraftUseCase.execute({
      ...bodyData,
      jobPostingId: paramsData.job_id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case BadRequestError:
          return res.status(400).json({ message: error.message })
        default:
          next(error)
      }
    }

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
