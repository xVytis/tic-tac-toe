import React, { useContext, useEffect } from 'react';
import Grid from '../grid/grid';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { gameUpdated } from '../../store/reducers/game';
import { SocketContext } from '../../context/websocket';
import Log from '../log/log';

const TicTacToe = () => {
  const websocket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { grid, moves } = useSelector((state) => state.game);

  const handleGameUpdated = (payload: any) => {
    dispatch(gameUpdated(payload));
  };

  useEffect(() => {
    websocket.on('game', handleGameUpdated);

    return () => {
      websocket.off('game', handleGameUpdated);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex items-center flex-grow">
        <Grid grid={grid}></Grid>
      </div>
      <Log moves={moves}></Log>
    </div>
  );
};

export default TicTacToe;
