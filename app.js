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

var CHANNEL_ID = 1487386848;
var CHANNEL_SERECT = '0f75c2079ca3c06e972976d870718f2d';
var MID = '';
function sendTextMessage(sender, text) {
	const data = {
		to: [sender],
		toChannel: 1383378250,
		eventType: '138311608800106203',
		content: {
			contentType: 1,
			toType: 1,
			text: text
		}
	};

	console.log('send: ', data);

	request({
		url: LINE_API,
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Line-ChannelID': CHANNEL_ID,
			'X-Line-ChannelSecret': CHANNEL_SERECT//, 'X-Line-Trusted-User-With-ACL': MID
		},
		method: 'POST',
		body: JSON.stringify(data)
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
		console.log('send response: ', body);
	});
}

app.post('/webhook', (req, res) => {
	const result = req.body.result;
	for(let i=0; i<result.length; i++){
		const data = result[i]['content'];
		console.log('receive: ', data);
		sendTextMessage(data.from, data.text);
	}
});

console.log(process.argv[2]);
app.listen(process.argv[2])
