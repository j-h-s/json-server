const fs = require('fs')
const moment = require('moment')
const fileDir = './../public/files/'
const logFile = './log/input.log'

module.exports = {
  submitJson (req, res) {
    fs.readFile(fileDir + req.body.name, 'utf-8', (err, data) => {
      if (data) {
        res.send({
          code: 400,
          message: 'File ' + req.body.name + ' already exists. Please choose another name.'
        })
        return
      }

      logJson(req.body)
      res.send(outputJson(req.body))
    })
  }
}


const logJson = (body) => {
  const input = body.input.split(/\n/)

  let output = '\n[ ' + moment().format() + ' ] ' + body.name
  input.map((str) => {
    output += '\n[ ' + moment().format() + ' ] ' + str
  })

  fs.appendFile(logFile, output, 'utf-8', (err) => {
    if (err) throw err
  })
}


const outputJson = (body) => {
  const pretty = JSON.stringify(JSON.parse(body.input), null, 2)

  fs.writeFile(fileDir + body.name, pretty, (err) => {
    if (err) {
      return {
        code: 500,
        message: err
      }
    }
  })

  return {
    code: 201,
    message: 'File ' + body.name + ' successfully written.'
  }
}
