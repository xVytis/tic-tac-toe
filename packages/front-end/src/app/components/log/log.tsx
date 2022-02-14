import React from 'react';
import tw from 'tailwind-styled-components';

type LogProps = {
  moves: any[];
};

const Log = ({ moves }: LogProps) => {
  const LogStyled = tw.div<LogProps>`
    h-60
    w-full
    p-4
    text-xs
    text-gray-400
    border-t
    border-gray-100
  `;

  return (
    <LogStyled moves={moves}>
      {moves && (
        <ol>
          {moves.map((move, i) => (
            <li>
              <span className="font-bold">{i + 1}. </span>
              <span className="font-bold">Player: </span>
              {move.player} <span className="font-bold">Move: </span>
              {move.row}:{move.column}
            </li>
          ))}
        </ol>
      )}
    </LogStyled>
  );
};

export default Log;
