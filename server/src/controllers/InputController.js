const fs = require('fs')
const fileDir = './../public/files/'

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
  const array = JSON.stringify(body.input).split(/\n/)
  console.log(array)
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
