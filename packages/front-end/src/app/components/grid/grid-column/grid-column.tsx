import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from '../../../hooks/hooks';
import tw from 'tailwind-styled-components';

import { SocketContext, socket } from '../../../context/websocket';

type GridColumnProps = {
  row: number;
  column: number;
  player: number;
};

const GridColumnStyled = tw.div<GridColumnProps>`
    w-24
    h-24
    flex
    grow
    justify-center
    items-center
    bg-gray-100
    text-black
    text-xl
    shadow-sm
    m-1
    hover:bg-gray-200
    cursor-pointer
    ${(p) => (p.player ? 'bg-gray-200' : 'text-gray-100')}
    `;

const GridColumn = ({ row, column, player }: GridColumnProps) => {
  const websocket = useContext(SocketContext);
  const { moves, winCombo } = useSelector((state) => state.game);

  const hasWon = (row: number, col: number) => {
    let result = false;
    result = winCombo.some((col) => col.row === row && col.column === column);
    return result;
  };
  const [won, setWon] = useState(false);

  useEffect(() => {
    setWon(hasWon(row, column));

    return () => {};
  }, [row, column, winCombo]);

  const handleClicked = () => {
    const player = moves && moves.length % 2 === 0 ? 1 : 2;
    websocket.emit('player', { row, column, player });
  };

  return (
    <GridColumnStyled
      className={won ? 'bg-green-500 hover:bg-green-500' : ''}
      player={player}
      onClick={handleClicked}
      row={row}
      column={column}
    >
      {player === 1 ? 'X' : player === 2 ? 'O' : ''}
      {!player && (moves && moves.length % 2 === 0 ? 'X' : 'O')}
    </GridColumnStyled>
  );
};

export default GridColumn;
export { GridColumnStyled };
