const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/', (req, res) => {
  const response = {
    message: 'Hello world'
  }

  res.send(response)
})

app.post('/test', (req, res) => {
  const response = {
    message: `Message received: ${req.body.message}`
  }

  res.send(response)
})

app.listen(process.env.PORT || 8081)

console.log('Hello world')
