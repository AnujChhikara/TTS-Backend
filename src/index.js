import app from './app.js'
import dotenv from 'dotenv'

dotenv.config({
  path: './.env',
})

const port = process.env.PORT || 8000

console.log('PORT from env:', process.env.PORT)

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})
