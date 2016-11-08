var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world')
})

app.get('/webhook', function (req, res) {
	res.send('webhook')
})

console.log(process.argv[2]);
app.listen(process.argv[2])
