const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 55001
const fs = require('fs')
var cors = require('cors')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('assets/'))


app.post('/assets/game.json/join', function (req, res) {
	console.log(getDate() + ' POST join ' + req.body.playerName);
	const prev = fs.readFileSync('game.json', 'utf8')
	var obj = JSON.parse(prev)
	obj.sequence = obj.sequence + 1
	if(!obj.hasOwnProperty('players')){
		obj.players = []
	}
	obj.players.push(JSON.parse('{"name":"' + req.body.playerName + '"}'))
	fs.writeFileSync('game.json', JSON.stringify(obj, null, 2));
	res.sendfile('game.json')
})

app.post('/assets/game.json/dice', function (req, res) {
	console.log(getDate() + ' POST dice ' + req.body.dice1 + ' - ' + req.body.dice2);
	const prev = fs.readFileSync('game.json', 'utf8')
	var obj = JSON.parse(prev)
	obj.sequence = obj.sequence + 1

	obj.dice1 = req.body.dice1
	obj.dice2 = req.body.dice2

	fs.writeFileSync('game.json', JSON.stringify(obj, null, 2));
	res.sendfile('game.json')
})

app.post('/assets/game.json/drei', function (req, res) {
	console.log(getDate() + ' POST drei ' + req.body.newDreimann);
	const prev = fs.readFileSync('game.json', 'utf8')
	var obj = JSON.parse(prev)
	obj.sequence = obj.sequence + 1

	obj.dreimann.name = req.body.newDreimann

	fs.writeFileSync('game.json', JSON.stringify(obj, null, 2));
	res.sendfile('game.json')
})


app.post('/assets/game.json/rule', function (req, res) {
	console.log(getDate() + ' POST rule ' + req.body.newRule);
	const prev = fs.readFileSync('game.json', 'utf8')
	var obj = JSON.parse(prev)
	obj.sequence = obj.sequence + 1
	
	obj.rule2 = obj.rule1
	obj.rule1 = req.body.newRule

	fs.writeFileSync('game.json', JSON.stringify(obj, null, 2));
	res.sendfile('game.json')
})



app.get('/assets/game.json', (req, res) => {
	console.log(getDate() + ' GET ' + 'game.json');
	res.sendfile('game.json')
})


app.listen(port, () => console.log(`Listening (DEBUG) at http://localhost:${port}`))

function getDate() {
	var dt = new Date();
	return dt.toLocaleTimeString();
}