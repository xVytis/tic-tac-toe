import { Injectable } from '@nestjs/common';
import { Game, Move, Player } from './game.interface';

@Injectable()
export class GameService {
  private newGrid = () => Array.from({ length: 3 }, (_, row) => Array.from({ length: 3 }, (_, column) => ({ row, column })));

  private newGame = (): Game => ({ grid: this.newGrid(), winCombo: [], moves: [] });

  private game: Game = this.newGame();

  private whoseTurn = (): Player => (this.game.moves.length % 2 === 0 ? Player.X : Player.O);

  private isMoveValid = (move: Move): boolean => {
    if (move.player != this.whoseTurn()) {
      return false;
    }
    if (!!this.game.grid[move.row][move.column].player) {
      return false;
    }

    return true;
  };

  private checkGameFinished = (move: Move): boolean => {
    let winDiagonal, winAntiDiagonal, draw;
    const winColumn = !this.game.grid.some((row) => row[move.column].player !== move.player);
    const winRow = !this.game.grid[move.row].some((column) => column.player !== move.player);
    if (move.row === move.column) {
      winDiagonal = !this.game.grid.some((row, index) => row[index].player !== move.player);
    }
    if (move.row + move.column == this.game.grid.length - 1) {
      winAntiDiagonal = !this.game.grid.some(
        (row, index) => row[this.game.grid.length - 1 - index].player !== move.player,
      );
    }
    if (this.game.moves.length === this.game.grid.length * this.game.grid.length) {
      draw = true;
    }

    const isFinished = winColumn || winRow || winDiagonal || winAntiDiagonal || draw;
    if (isFinished) {
      this.game.finished = new Date();
    } else {
      return isFinished;
    }

    if (winColumn) {
      this.game.winCombo = this.game.grid.map((row) => row[move.column]);
    } else if (winRow) {
      this.game.winCombo = this.game.grid[move.row];
    } else if (winDiagonal) {
      this.game.winCombo = this.game.grid.map((row, index) => row[index]);
    } else if (winAntiDiagonal) {
      this.game.winCombo = this.game.grid.map((row, index) => row[this.game.grid.length - 1 - index]);
    }

    return isFinished;
  };

  getGame = () => this.game;

  makeMove = (move: Move) => {
    if (this.game.finished) {
      this.game = this.newGame();
    }
    if (this.isMoveValid(move)) {
      this.game.grid[move.row][move.column].player = this.whoseTurn();
      this.game.moves.push(move);
      this.checkGameFinished(move);
    }
  };
}
