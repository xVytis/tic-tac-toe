import React, { useContext } from 'react';
import tw from 'tailwind-styled-components';
import GridColumn from './grid-column/grid-column';
import { SocketContext, socket } from '../../context/websocket';
import { useSelector } from '../../hooks/hooks';

type GridProps = {
  grid: any[];
};

const GridStyled = tw.div`
  p-1
  rounded
  shadow-md`;

const Grid = ({ grid }: GridProps) => {
  return (
    <GridStyled>
      {grid.map((row, i) => (
        <div className="flex">
          {row.map((column, y) => (
            <GridColumn player={column.player} row={i} column={y}></GridColumn>
          ))}
        </div>
      ))}
    </GridStyled>
  );
};

export default Grid;
