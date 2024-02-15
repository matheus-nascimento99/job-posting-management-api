import { Router } from 'express'

import { fetchJobsFeed } from '../controllers/fetch-jobs-feed'

const router = Router()

router.get('/', fetchJobsFeed)

export default router
