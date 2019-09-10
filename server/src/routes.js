const FileController = require('./controllers/FileController')
const InputController = require('./controllers/InputController')

module.exports = (app) => {
  app.get('/list', FileController.getList)
  app.get('/file/:name', FileController.getFile)
  app.put('/submit', InputController.submitJson)

  app.all('*', (req, res) => {
    res.redirect('http://localhost:8080/')
  })
}
