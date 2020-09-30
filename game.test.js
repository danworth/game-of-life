const Game = require('./game.js')

test('should create a game with correct sized borad', () => {
  const game = new Game(5, [])
  expect(game.size).toBe(5)
})

test('should correctly populate starting board', () => {
  const game = new Game(5, [{x: 1, y: 1 }, { x: 2, y:2 }, { x:3, y: 3 }])
  expect(game.board[0][0]).toBe(undefined)
  expect(game.board[1][1]).toBe(true)
  expect(game.board[2][2]).toBe(true)
  expect(game.board[3][3]).toBe(true)
  expect(game.board[4][4]).toBe(undefined)
})
