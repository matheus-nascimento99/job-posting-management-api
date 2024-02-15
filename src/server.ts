import { app } from './app'
import { env } from './env'
import companyRoutes from './infra/http/routes/company'
import feedRoutes from './infra/http/routes/feed'
import jobRoutes from './infra/http/routes/job'

app.use('/company', companyRoutes)
app.use('/job', jobRoutes)
app.use('/feed', feedRoutes)

app.listen(env.NODE_ENV === 'test' ? 3334 : env.PORT, () => {
  console.log('HTTP Server running!')
})
