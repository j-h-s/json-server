const fs = require('fs')
const fileDir = './static/files/'

module.exports = {
  getList (req, res) {
    fs.readdir(fileDir, (err, files) => {
      if (err) {
        console.log(err)
        return
      }

      let list = []
      files.forEach((file) => {
        if (file.endsWith('.json')) {
          list.push({ "name": file })
        }
      })
      res.send(JSON.stringify(list))
    })
  },

  getFile (req, res) {
    let json = new Object()
    json.name = req.params.name
    json.path = fileDir + req.params.name

    fs.readFile(json.path, 'utf-8', (err, file) => {
      if (err) {
        console.log(err)
        return
      }

      json.body = file
      res.send(json)
    })
  }
}
