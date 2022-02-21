const express = require('express')
const morgan = require('morgan')
 
const app = express()
const port = 8080
 
app.use(morgan('dev'))
 
app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
