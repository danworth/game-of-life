const Game = require('./game.js');

test('should create a game with correct sized borad', () => {
  const game = new Game(5, []);
  expect(game.size).toBe(5);
});

test('should correctly populate starting board', () => {
  const game = new Game(5, [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]);
  expect(game.isCellAlive(0, 0)).toBe(false);
  expect(game.isCellAlive(1, 1)).toBe(true);
  expect(game.isCellAlive(2, 2)).toBe(true);
  expect(game.isCellAlive(4, 4)).toBe(false);
});

test('should not permit cell beyond grid board', () => {
  expect(() => {
    new Game(2, [{ x: 4, y: 4 }]);
  }).toThrow();
});

test('should correctly count living neighbours', () => {
  const game = new Game(5, [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]);
  expect(game.howManyLivingNeighbours(0, 0)).toBe(1);
  expect(game.howManyLivingNeighbours(1, 1)).toBe(1);
  expect(game.howManyLivingNeighbours(1, 2)).toBe(2);
  expect(game.howManyLivingNeighbours(4, 4)).toBe(1);
});

test('should correctly return future state', () => {
  const game = new Game(5, [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]);
  expect(game.cellWillBeAliveNextGo(0, 0)).toBe(false);
  expect(game.cellWillBeAliveNextGo(2, 1)).toBe(false);
  expect(game.cellWillBeAliveNextGo(2, 2)).toBe(true);
  expect(game.cellWillBeAliveNextGo(2, 3)).toBe(false);
  expect(game.cellWillBeAliveNextGo(1, 2)).toBe(true);
  expect(game.cellWillBeAliveNextGo(3, 2)).toBe(true);
});

test('should correctly update the game', () => {
  const game = new Game(5, [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]);
  game.updateGame();
  expect(game.isCellAlive(0, 0)).toBe(false);
  expect(game.isCellAlive(2, 1)).toBe(false);
  expect(game.isCellAlive(2, 2)).toBe(true);
  expect(game.isCellAlive(2, 3)).toBe(false);
  expect(game.isCellAlive(1, 2)).toBe(true);
  expect(game.isCellAlive(3, 2)).toBe(true);
});

test('print the board', () => {
  const game = new Game(5, [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]);
  game.printBoard();
  game.updateGame();
  console.log('next round');
  game.printBoard();
});
