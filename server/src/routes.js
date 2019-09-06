const FileController = require('./controllers/FileController')

module.exports = (app) => {
  app.get('/list', FileController.getList)
  app.get('/file/:name', FileController.getFile)
  app.put('/submit', FileController.submit)

  app.all('*', (req, res) => {
    res.redirect('http://localhost:3333/')
  })
}
