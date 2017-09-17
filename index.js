var express = require('express')
//var morgan = require('morgan')
var app = express()

//app.use(morgan('dev'))

app.use(express.static('css'))
app.use(express.static('img'))
app.use(express.static('js'))
app.use(express.static('./'))

app.listen(3000, function() {
  console.log('ready to receive requests on port 3000...')
})

