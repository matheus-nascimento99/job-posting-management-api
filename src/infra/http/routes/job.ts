import { Router } from 'express'

import { archiveJobPostingDraft } from '../controllers/archive-active-job-posting'
import { createJobPostingDraft } from '../controllers/create-job-posting-draft'
import { deleteJobPostingDraft } from '../controllers/delete-job-posting-draft'
import { editJobPostingDraft } from '../controllers/edit-job-posting-draft'
import { publishJobPostingDraft } from '../controllers/publish-job-posting-draft'

const router = Router()

router.post('/', createJobPostingDraft)
router.put('/:job_id/publish', publishJobPostingDraft)
router.put('/:job_id', editJobPostingDraft)
router.delete('/:job_id', deleteJobPostingDraft)
router.put('/:job_id/archive', archiveJobPostingDraft)

export default router
