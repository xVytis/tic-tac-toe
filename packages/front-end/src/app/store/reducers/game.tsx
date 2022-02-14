import { createSlice } from '@reduxjs/toolkit';

type GridColumn = {
  index: number;
  row: number;
  state: any;
};

type Grid = GridColumn[][];

type Game = {
  grid: Grid;
  started: Date;
  finished: Date;
  moves: [];
};

type Move = {
  row: number;
  column: number;
};

export const playerSlice = createSlice({
  name: 'game',
  initialState: {
    grid: Array(3).fill(Array(3).fill({})),
    moves: [{ asd: 'aa' }],
    winCombo: [],
    started: undefined,
    finished: undefined,
  },
  reducers: {
    gameUpdated: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { gameUpdated } = playerSlice.actions;
export default playerSlice.reducer;
