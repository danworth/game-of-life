const Game = require('./game')

const game = new Game(5, [{x: 2, y: 1 }, { x: 2, y:2 }, { x:2, y: 3 }])
game.playGame(10)
