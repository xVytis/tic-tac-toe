import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway() 
export class GameGateway implements OnGatewayConnection {
  constructor(private gameService: GameService) {}


  @WebSocketServer()
  server;

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('game', this.gameService.getGame());
  }

  @SubscribeMessage('player')
  handleMessage(client: any, payload: any) {
    this.gameService.makeMove(payload);
    this.server.emit('game', this.gameService.getGame());
  }
}
