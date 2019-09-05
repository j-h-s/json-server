const fs = require('fs')

module.exports = {
  submit (req, res) {
    const response = {
      message: `Input received: ${req.body.input}`
    }

    res.send(response)
  },

  list (req, res) {
    fs.readdir('./../public/files', function(err, files) {
      if (err) {
        console.log(err)
      } else {
        let arr = []
        files.forEach((file) => {
          arr.push({
            "name": file,
            "path": "./../public/files/" + file
          })
        })
        console.log(arr)
        res.send(JSON.stringify(arr))
      }
    })
  },

  file (req, res) {
    const path = './../public/files/' + req.params.name 
    // res.download(path)

    fs.readFile(path, 'utf-8', function(err, file) {
      if (err) {
        console.log(err)
      } else {
        console.log(file)
        res.send(file)
      }
    })
  }
}
