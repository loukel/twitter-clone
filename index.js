const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

// Create express app 🔨 
const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())

// Routes 🐎
app.use(express.static('public'))
app.use('/api/', routes)

// Start Server 🎉
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Web server listening on ${PORT}`)
})

