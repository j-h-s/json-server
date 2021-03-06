const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

require('./routes')(app)

const port = process.env.PORT || 3333
app.listen(port)
console.log('Listening on port ' + port)
