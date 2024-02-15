import cors from 'cors'
import express, { Request, Response } from 'express'

import { app } from './app'
import { env } from './env'
import companyRoutes from './infra/http/routes/company'
import feedRoutes from './infra/http/routes/feed'
import jobRoutes from './infra/http/routes/job'

app.use(cors())
app.use(express.json())

app.use('/company', companyRoutes)
app.use('/job', jobRoutes)
app.use('/feed', feedRoutes)

app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).send({ err })
})

app.listen(env.NODE_ENV === 'test' ? 3334 : env.PORT, () => {
  console.log('HTTP Server running!')
})
