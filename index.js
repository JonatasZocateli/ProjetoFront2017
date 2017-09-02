var express = require('express')
var app = express()

app.use(express.static('css'))
app.use(express.static('img'))
app.use(express.static('js'))
app.use(express.static('./'))


app.listen(3000, function() {
	
})

