import app from './app'
import { env } from './env'

app.listen(env.NODE_ENV === 'test' ? 3334 : env.PORT, () => {
  console.log('HTTP Server running!')
})
