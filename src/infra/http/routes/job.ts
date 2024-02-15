import { Router } from 'express'

import { createJob } from '../controllers/create-job'
import { deleteJobPostingDraft } from '../controllers/delete-job-posting-draft'
import { editJobPostingDraft } from '../controllers/edit-job-posting-draft'
import { publishJobPostingDraft } from '../controllers/publish-job-posting-draft'

const router = Router()

router.post('/', createJob)
router.put('/:job_id/publish', publishJobPostingDraft)
router.put('/:job_id', editJobPostingDraft)
router.delete('/:job_id', deleteJobPostingDraft)

export default router
