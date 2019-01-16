var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/teste', function (req, res) {
	var tste = {var1 : 1, var2 : 2, var3 : [{var1 : 1},{var1 : 1}]};
  res.send(tste);
});


app.get('/sudoku', function (req, res) {
	let numbers = []
	
	for(let i = 0; i < 81 ; i++) {
		numbers.push(Math.floor(Math.random() * 9) + 1 );
	}
  res.send(numbers);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});