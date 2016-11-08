var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world')
})

app.post('/profile', upload.array(), function (req, res, next) {
	console.log(req.body);
	res.json(req.body);
});

app.get('/webhook', function (req, res) {
	console.log(req.body);
	res.json(req.body);
})

console.log(process.argv[2]);
app.listen(process.argv[2])
