import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { BadRequestError } from '@/core/errors/bad-request'
import { Company } from '@/domain/job-posting-management/enterprise/entities/company'
import { CompanyPresenter } from '@/infra/database/presenters/company'

import { makeGetCompanyById } from './factories/make-get-company-by-id'

export const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.object({
    company_id: z.string().uuid(),
  })

  const data = schema.parse(req.params)

  const getCompanyByIdUseCase = makeGetCompanyById()

  try {
    const result = await getCompanyByIdUseCase.execute({
      companyId: data.company_id,
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

    return res.status(200).send({
      item: CompanyPresenter.toHTTP(
        (result.value as { company: Company }).company,
      ),
    })
  } catch (error) {
    next(error)
  }
}
