import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: true,
})
export class SocketGateway {
  constructor(private readonly userService: UsersService) {}
  @WebSocketServer() server: Server;
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any): Promise<string> {
    client.to(payload.chatId).emit('message', payload.messageUser);
    return 'Hello world!';
  }
  @SubscribeMessage('connect')
  handleConnect(client: Socket, payload: any): string {
    return 'Hello world!';
  }
  @SubscribeMessage('read')
  handleRead(client: Socket, payload: any): string {
    console.log(payload);
    client.to(payload).emit('read', payload);
    return 'Hello world!';
  }
  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, payload: string) {
    console.log(payload);
    client.join(payload);
  }
  @SubscribeMessage('leave')
  handleLeaveRoom(client: Socket, payload: string) {
    console.log(payload);
    client.leave(payload);
  }

  @SubscribeMessage('updateStatus')
  handleEvent(@MessageBody() data: { userId: string; status: string }): string {
    console.log(data);
    this.userService.updateUser({ id: data.userId, status: data.status });
    return 'data';
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Add any logic you want to execute when a client disconnects
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Add any logic you want to execute when a client connects
  }
}
