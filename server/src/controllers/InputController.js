const fs = require('fs')
const moment = require('moment')
const fileDir = './static/files/'
const logFile = './log/input.log'

module.exports = {
  /*
   * Process submitted json data
   */
  submitJson (req, res) {
    fs.readFile(fileDir + req.body.name, 'utf-8', (err, data) => {

      // if file doesn't already exist
      if (!data) {
        logJson(req.body)
        res.send(outputJson(req.body))
        return
      }

      // if file exists
      res.send({
        code: 400,
        message: 'A file named ' + req.body.name + ' already exists. Please choose another name.'
      })
    })
  }
}


/*
 * Log json to input.log
 */
const logJson = (body) => {
  const input = body.input.split(/\n/)

  // log file name first
  let output = '[ ' + moment().format() + ' ] ' + body.name + '\n'

  // log each line
  input.map((str) => {
    output += '[ ' + moment().format() + ' ] ' + str + '\n'
  })

  // write to file
  fs.appendFile(logFile, output, 'utf-8', (err) => {
    if (err) throw err
  })
}


/*
 * Output json to a new file
 */
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
