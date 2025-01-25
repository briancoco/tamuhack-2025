const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')

app.get('/', (req, res) => {
  res.json("Hello World")
  return
})

const start = async () => {
  const port = process.env.PORT
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()