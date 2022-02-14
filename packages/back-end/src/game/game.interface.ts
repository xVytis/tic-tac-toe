export enum GridColumnState {
  NotSelected = 0,
  SelectedX,
  SelectedO,
}

export enum Player {
  X = 1,
  O,
}

export type GridColumn = {
  index: number;
  row: number;
  player: Player;
};

export type Grid = any[][];

export type Game = {
  grid: Grid;
  started?: Date;
  finished?: Date;
  moves: Move[];
  winCombo: GridColumn[]
};

export type Move = {
  row: number;
  column: number;
  player: Player;
};
