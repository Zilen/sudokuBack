var express = require('express');
var app = express();

var quadrante = undefined;//	 [0,1,2, 9, 10, 11, 18 ,19 ,20],[3,4,5, 12, 13 ,14, 21, 22 , 23],[6,7,8, 15 ,16 ,17, 24 ,25 ,26, 27],
				//[28, 29, 30,37,38,39,46,47,48],[31,32,33,40,41,42,49,50,51],[34,35,36,43,44,45,52,53,54],
				//[55,56,57,64,65,66,73,74,75],[,58,59,60,67,68,69,76,77,78],[61,62,63,70,71,72,79,80,81];
                

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
app.post('/returnteste', function (req, res) {
	var arai = [];
	for ( var i = 0; i < 81; i++) {
		arai.push(i);
	}
		var a1 = getArrayUsedNumbers(arai, 1)
		var a25 = getArrayUsedNumbers(arai, 25)
		var a66 = getArrayUsedNumbers(arai, 66)
  res.send(a1);
});


app.get('/quadrantes', function (req, res) {
  res.send(getQuadrantes());
});

app.get('/sudoku', function (req, res) {
	res.send(sudokuNumbers(req,res));
	/* res.send([1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9,
		1,2,3,4,5,6,7,8,9]) */
		
		
		
});

function sudokuNumbers(req, res) {
	let numbers = []
	
	for(let i = 0; i < 81 ; i++) {
		var usedNumbers = getArrayUsedNumbers(numbers, i);
		var erro = true;
		for (var f = 1; f <10; f++) {
			if (!usedNumbers.includes(f)) {
				erro = false;
			}
		}
		if (erro == true) {
			return sudokuNumbers(req,res);
		}
		var number = undefined;
		do {
			number = Math.floor(Math.random() * 9) + 1;
		} while (usedNumbers.includes(number))
		numbers.push(number);
	}
	return numbers;
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function getArrayUsedNumbers(numbers, i) {
	if (i < 1) {
		return [];
	}
	var horzizontal = []
	var vertical = []
	var quadrante = []


	let numbersReturn = [];
	
	//horizontal
	let aux = 0;
	let aux2 = i - (i%9);
	let iterator = i-1;
	while (iterator >= aux2) {
		horzizontal.push(numbers[iterator]);
		numbersReturn.push(numbers[iterator--]);
	}
	//vertical
	for (var u = i-9; u >=0; u=u-9) {
		numbersReturn.push(numbers[u]);
		vertical.push(numbers[u]);
	}
	//quadrado
	var quadrantes = getQuadrantes();
	for (var o = 0; o < 3; o++) {
		for (var u = 0; u < 3; u++) {
			if(quadrantes[o][u].includes(i)) {
				quadrantes[o][u].forEach(function(value){
					if (numbers[value] != undefined) {
						numbersReturn.push(numbers[value]);
						quadrante.push(numbers[value]);
					}
				});
				
			}
		}
	}

	//horzizontal
	//vertical
	//quadrante
	//numbers
	//i

	return numbersReturn;
}


function changeinvalidNumber(numbers, i) {
	let lineStart =  i - (i%9);
	let lineNumbers = []
	let openNumbers = []
	for(var u = lineStart; u < i; u++) {
		lineNumbers.push(numbers[u]);
	}
	for(var u = 1; u < 10; u++) {
		if(!lineNumbers.includes(u)) {
			openNumbers.push(u);
		}
	}
	//iterar numeros abertos e passar para a primeira posicao que seja valida a troca
	for(var u = lineStart; u < i; u++) {
		var num = numbers[u];
		var usedNumbers = getArrayUsedNumbers(numbers, u);
		openNumbers.forEach(function(value){
			if (!usedNumbers.includes(value)) {
				numbers.push(num);
				numbers[u] = value
			}
		});
	}
}

function getQuadrantes() {
	if (quadrante != undefined) {
		return quadrante;
	}
	quadrante = [];
	for (var i = 0; i < 3; i++) {
		quadrante[i] = [];
		for (var u = 0; u < 3; u++) {
			quadrante[i][u] = [];
		}
	}
	for (var i = 0; i < 81; i++) {
		var iMod9 = i%9;
		var iMod9Div3 = Math.floor(iMod9/3)
		var iDiv27 = Math.floor(i/27);
		console.log(iMod9Div3+' '+iDiv27 + ' = '+i);

		quadrante[iMod9Div3][iDiv27].push(i);
	}
	return quadrante;
}