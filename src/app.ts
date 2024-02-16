import cors from 'cors'
import express, { Request, Response } from 'express'

import companyRoutes from './infra/http/routes/company'
import feedRoutes from './infra/http/routes/feed'
import jobRoutes from './infra/http/routes/job'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/company', companyRoutes)
app.use('/job', jobRoutes)
app.use('/feed', feedRoutes)

app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).send({ err })
})

export default app
