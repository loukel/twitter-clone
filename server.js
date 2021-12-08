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

app.use ((_, res) => {
  res.status(404).send('<center style=\'font-size: 3rem;\'>Page Not Found</center>')
})

module.exports = app