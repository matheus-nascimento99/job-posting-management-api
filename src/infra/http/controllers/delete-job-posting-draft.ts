import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { BadRequestError } from '@/core/errors/bad-request'

import { makeDeleteJobPostingDraft } from './factories/make-delete-job-posting-draft'

export const deleteJobPostingDraft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    job_id: z.string().uuid(),
  })

  const data = schema.parse(req.params)

  const deleteJobPostingDraftUseCase = makeDeleteJobPostingDraft()

  try {
    const result = await deleteJobPostingDraftUseCase.execute({
      jobPostingId: data.job_id,
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

    return res.status(200).send()
  } catch (error) {
    next(error)
  }
}
