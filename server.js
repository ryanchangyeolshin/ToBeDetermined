require('dotenv/config')
const express = require('express')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname, '/public')

app
  .use(express.static(publicPath))
  .get('/', function (req, res) {
    res.render('index.html')
  })
  .listen(process.env.PORT, function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server started on PORT ${process.env.PORT}`)
  })
