import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { Move } from './game.interface';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('game grid should be defined', () => {
    expect(service.getGame().grid.length > 0).toBeTruthy();
  });

  it('valid move should be recorded', () => {
    const move1: Move = {
      row: 0,
      column: 0,
      player: 1,
    };

    service.makeMove(move1);
    expect(service.getGame().moves).toHaveLength(1);
    expect(service.getGame().grid[0][0].player).toEqual(1);
  });

  it('player should not be allowed to make a move two times in a row', () => {
    const move1: Move = {
      row: 0,
      column: 0,
      player: 1,
    };
    const move2: Move = {
      row: 0,
      column: 1,
      player: 1,
    };

    service.makeMove(move1);
    service.makeMove(move2);
    expect(service.getGame().grid[0][1].player).toBeFalsy();
    expect(service.getGame().moves).toHaveLength(1);
  });

  it('player should not be able to select already selected column', () => {
    const move1: Move = {
      row: 0,
      column: 0,
      player: 1,
    };
    const move2: Move = {
      row: 0,
      column: 0,
      player: 2,
    };

    service.makeMove(move1);
    service.makeMove(move2);
    expect(service.getGame().grid[0][0].player).toEqual(1);
    expect(service.getGame().moves).toHaveLength(1);
  });

  it('player should win with a row combo', () => {
    const move1: Move = {
      row: 0,
      column: 0,
      player: 1,
    };
    const move2: Move = {
      row: 1,
      column: 0,
      player: 2,
    };
    const move3: Move = {
      row: 0,
      column: 1,
      player: 1,
    };
    const move4: Move = {
      row: 1,
      column: 1,
      player: 2,
    };
    const move5: Move = {
      row: 0,
      column: 2,
      player: 1,
    };

    service.makeMove(move1);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move2);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move3);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move4);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move5);
    expect(service.getGame().finished).toBeTruthy();
    expect(service.getGame().winCombo).toHaveLength(3);
  });

  it('player should win with a column combo', () => {
    const move1: Move = {
      row: 0,
      column: 0,
      player: 1,
    };
    const move2: Move = {
      row: 0,
      column: 1,
      player: 2,
    };
    const move3: Move = {
      row: 1,
      column: 0,
      player: 1,
    };
    const move4: Move = {
      row: 1,
      column: 1,
      player: 2,
    };
    const move5: Move = {
      row: 2,
      column: 0,
      player: 1,
    };

    service.makeMove(move1);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move2);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move3);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move4);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move5);
    expect(service.getGame().finished).toBeTruthy();
    expect(service.getGame().winCombo).toHaveLength(3);
  });

  it('player should win with a diagonal combo', () => {
    const move1: Move = {
      row: 0,
      column: 0,
      player: 1,
    };
    const move2: Move = {
      row: 0,
      column: 1,
      player: 2,
    };
    const move3: Move = {
      row: 1,
      column: 1,
      player: 1,
    };
    const move4: Move = {
      row: 1,
      column: 2,
      player: 2,
    };
    const move5: Move = {
      row: 2,
      column: 2,
      player: 1,
    };

    service.makeMove(move1);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move2);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move3);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move4);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move5);
    expect(service.getGame().finished).toBeTruthy();
    expect(service.getGame().winCombo).toHaveLength(3);
  });

  it('player should win with a anti-diagonal combo', () => {
    const move1: Move = {
      row: 0,
      column: 2,
      player: 1,
    };
    const move2: Move = {
      row: 0,
      column: 0,
      player: 2,
    };
    const move3: Move = {
      row: 1,
      column: 1,
      player: 1,
    };
    const move4: Move = {
      row: 1,
      column: 2,
      player: 2,
    };
    const move5: Move = {
      row: 2,
      column: 0,
      player: 1,
    };

    service.makeMove(move1);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move2);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move3);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move4);
    expect(service.getGame().finished).toBeFalsy();
    service.makeMove(move5);
    expect(service.getGame().finished).toBeTruthy();
    expect(service.getGame().winCombo).toHaveLength(3);
  });
});
