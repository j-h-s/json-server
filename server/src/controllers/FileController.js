const fs = require('fs')
const fileDir = './../public/files/'

module.exports = {
  getList (req, res) {
    fs.readdir(fileDir, function(err, files) {
      if (err) {
        console.log(err)
      } else {
        let list = []
        files.forEach((file) => {
          list.push({ "name": file })
        })
        res.send(JSON.stringify(list))
      }
    })
  },

  getFile (req, res) {
    let json = new Object()
    json.name = req.params.name
    json.path = fileDir + req.params.name

    fs.readFile(json.path, 'utf-8', function(err, file) {
      if (err) {
        console.log(err)
      } else {
        json.body = file
        res.send(json)
      }
    })
  }
}
