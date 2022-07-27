const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '.')))
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'))
})

app.listen(process.env.PORT || 3000)
