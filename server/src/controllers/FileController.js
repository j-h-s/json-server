const fs = require('fs')
const fileDir = './static/files/'

module.exports = {
  /*
   * Return a list of all files in a directory
   */
  getList (req, res) {
    fs.readdir(fileDir, (err, files) => {
      if (err) {
        console.log(err)
        return
      }

      // build array of file names
      let list = []
      files.forEach((file) => {
        if (file.endsWith('.json')) {
          list.push({ "name": file })
        }
      })

      // return array as a string
      res.send(JSON.stringify(list))
    })
  },

  /*
   * Retrieve the contents of one file
   */
  getFile (req, res) {
    fs.readFile(fileDir + req.params.name, 'utf-8', (err, file) => {
      if (err) {
        console.log(err)
        return
      }

      const json = new Object({
        name: req.params.name,
        body: file
      })

      res.send(json)
    })
  }
}
