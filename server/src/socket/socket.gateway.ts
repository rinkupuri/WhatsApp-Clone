import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: true,
})
export class SocketGateway {
  constructor(private readonly userService: UsersService) {}
  session = new Map<string, string>();
  @WebSocketServer() server: Server;
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log(payload);
    client.to(payload.chatId).emit('message', payload.messageUser);
    client.to(payload.messageUser.receiverId).emit('chat', payload.messageUser);
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
  handleEvent(
    client: Socket,
    data: { userId: string; status: string },
  ): string {
    console.log(data.userId);
    this.session.set(client.id, data.userId);
    this.userService.updateUser({ id: data.userId, status: data.status });
    return 'data';
  }

  handleDisconnect(client: Socket) {
    // console.log(client.id, this.session);
    // console.log(this.session.get(client.id));
    // this.userService.updateUser({
    //   id: this.session.get(client.id),
    //   status: new Date().toString(),
    // });
    console.log(`Client disconnected: ${client.id}`);
    // Add any logic you want to execute when a client disconnects 1
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connected', client.id);
    // Add any logic you want to execute when a client connects
  }
}
