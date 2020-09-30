class Game {
  constructor(size, livingCells = []) {
    this.size = size;
    this.setLivingCells(livingCells);
  }

  setLivingCells(cells) {
    this.livingCells = new Set();
    cells.forEach((cell) => {
      if (cell.x > this.size || cell.y > this.size) {
        throw new Error(`${JSON.stringify(cell)} is beyound the grid`);
      }
      this.livingCells.add(this.convertCoordinateToString(cell.x, cell.y));
    });
  }

  //js cannot override equality check for an object for Set.has()
  //so convert to a String which gives the desired behaviour
  convertCoordinateToString(x, y) {
    return `${x}:${y}`
  }

  updateGame() {
    const newLivingCells = new Set();
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.cellWillBeAliveNextGo(x, y)) {
          newLivingCells.add(this.convertCoordinateToString(x, y));
        }
      }
    }
    this.livingCells = newLivingCells
  }

  cellWillBeAliveNextGo(x, y) {
    const isAlive = this.isCellAlive(x, y);
    const numberOfNeighbours = this.howManyLivingNeighbours(x, y);

    if (this.isBorn(isAlive, numberOfNeighbours)) {
      return true
    }

    if (this.underPopulated(isAlive, numberOfNeighbours)) {
      return false;
    }

    if (this.staysAlive(isAlive, numberOfNeighbours)) {
      return true;
    }

    if (this.overPopulated(isAlive, numberOfNeighbours)) {
      return false;
    }

    // can't really be reached so probably needs refactoring
    // but I like that the logic is easy to follow
    return false;
  }

  underPopulated(isAlive, numberOfNeighbours) {
    return isAlive && numberOfNeighbours < 2;
  }

  staysAlive(isAlive, numberOfNeighbours) {
    return isAlive && (numberOfNeighbours === 2 || numberOfNeighbours === 3);
  }

  overPopulated(isAlive, numberOfNeighbours) {
    return isAlive && numberOfNeighbours > 3;
  }

  isBorn(isAlive, numberOfNeighbours) {
    return !isAlive && numberOfNeighbours === 3;
  }

  isCellAlive(x, y) {
    return this.livingCells.has(`${x}:${y}`);
  }

  howManyLivingNeighbours(x, y) {
    let lives = 0;

    // top left
    if (x > 0 && y > 0 && this.isCellAlive(x - 1, y - 1)) lives += 1;
    // top middle
    if (y > 0 && this.isCellAlive(x, y - 1)) lives += 1;
    // top right
    if (x < this.size - 1 && y < this.size - 1 && this.isCellAlive(x + 1, y - 1)) lives += 1;
    // middle left
    if (x > 0 && this.isCellAlive(x - 1, y)) lives += 1;
    // middle right
    if (x < this.size - 1 && this.isCellAlive(x + 1, y)) lives += 1;
    // bottom left
    if (x > 0 && y < this.size - 1 && this.isCellAlive(x - 1, y + 1)) lives += 1;
    // bottom middle
    if (y < this.size - 1 && this.isCellAlive(x, y + 1)) lives += 1;
    // bottom right
    if (x < this.size - 1 && y < this.size - 1 && this.isCellAlive(x + 1, y + 1)) lives += 1;

    return lives;
  }

  printBoard() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const printChar = this.isCellAlive(x, y) ? 'X' : 'O';
        process.stdout.write(`${printChar} `);
      }
      process.stdout.write('\n');
    }
  }

  playGame(forHowManyRounds) {
    this.printBoard();
    const theGame = this;

    const timerId = setInterval(() => {
      process.stdout.write('                 \n');
      theGame.updateGame();
      theGame.printBoard();
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
    }, forHowManyRounds * 10000);
  }
}

module.exports = Game;
