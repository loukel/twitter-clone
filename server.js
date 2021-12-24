import express from 'express'
import morgan from 'morgan'
import routes from './routes/index.js'

// Create express app 🔨 
const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())

// Routes 🐎
app.use(express.static('public'))
app.use('/api/', routes)

app.use((_, res) => {
  res.status(404).send('<center style=\'font-size: 3rem;\'>Page Not Found</center>')
})

export default app