import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { BadRequestError } from '@/core/errors/bad-request'

import { makeArchiveActiveJobPosting } from './factories/make-archive-active-job-posting'

export const archiveJobPostingDraft = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    job_id: z.string().uuid(),
  })

  const data = schema.parse(req.params)

  const archiveActiveJobPostingUseCase = makeArchiveActiveJobPosting()

  try {
    const result = await archiveActiveJobPostingUseCase.execute({
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

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
