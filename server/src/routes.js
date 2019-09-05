const JsonController = require('./controllers/JsonController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    const response = {
      message: 'Hello world'
    }

    res.send(response)
  })

  app.get('/list', JsonController.list)
  app.put('/submit', JsonController.submit)
  app.get('/file/:name', JsonController.file)

  // app.get('/file/:name', (req, res) => {
  //   res.download('./../public/files/colors.json')
  // })
}
