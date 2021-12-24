import app from './server.js'

// Start Server 🎉
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Web server listening on ${PORT}`)
})