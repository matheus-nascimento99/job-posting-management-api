import { NextFunction, Request, Response } from 'express'

import { makeFetchJobsFeed } from './factories/make-fetch-jobs-feed'

export const fetchJobsFeed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fetchJobsUseCase = makeFetchJobsFeed()

  try {
    const result = await fetchJobsUseCase.execute()

    return res.status(200).send({
      items: result.value?.feed,
    })
  } catch (error) {
    next(error)
  }
}
