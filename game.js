class Game {

  constructor(size, livingCells) {
    this.size = size
    this.livingCells = livingCells
    this.board = this.initBoard()
  }

  initBoard() {
    let board = new Array(this.size)
    for(let i = 0; i < this.size; i++) {
      board[i] = new Array(this.size)
    }

    this.livingCells.forEach( cell => board[cell.x][cell.y] = true ) 
    return board
  }
}



module.exports = Game
