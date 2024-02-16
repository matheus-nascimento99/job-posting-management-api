import { Router } from 'express'

import { fetchCompanies } from '../controllers/fetch-companies'
import { getCompanyById } from '../controllers/get-company-by-id'

const router = Router()

router.get('/', fetchCompanies)
router.get('/:company_id', getCompanyById)

export default router
