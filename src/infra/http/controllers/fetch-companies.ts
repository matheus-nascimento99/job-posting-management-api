import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { CompanyPresenter } from '@/infra/database/presenters/company'

import { makeFetchCompanies } from './factories/make-fetch-companies'

export const fetchCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
  })

  const data = schema.parse(req.query)

  const fetchCompaniesUseCase = makeFetchCompanies()

  try {
    const result = await fetchCompaniesUseCase.execute(data)

    return res.status(200).send({
      items: result.value?.items.map((company) =>
        CompanyPresenter.toHTTP(company),
      ),
    })
  } catch (error) {
    next(error)
  }
}
