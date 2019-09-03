const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', (req, res) => {
  const response = {
    message: 'Hello world'
  }

  res.send(response)
})

app.listen(process.env.PORT || 8081)

console.log('Hello world')
