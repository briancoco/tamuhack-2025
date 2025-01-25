const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
  res.json("Hello World")
  return
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})