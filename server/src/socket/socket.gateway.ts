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
    client.to(payload.chatId).emit('message', payload);
    client.to(payload.receiverId).emit('chat', payload);
    return 'Hello world!';
  }
  @SubscribeMessage('connect')
  handleConnect(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  // reading messages and updating to user

  @SubscribeMessage('read')
  handleRead(
    client: Socket,
    payload: { chatId: string; status: string },
  ): string {
    console.log(payload);
    client.to(payload.chatId).emit('read', payload);
    return 'Hello world!';
  }

  // joining group when user connect with socket

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, payload: string) {
    console.log(payload);
    client.join(payload);
  }

  // leaving chat when component mount
  @SubscribeMessage('leave')
  handleLeaveRoom(client: Socket, payload: string) {
    console.log(payload);
    client.leave(payload);
  }

  // updating status of messages

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

  // Call user to make to another userId
  @SubscribeMessage('callUser')
  handleCallUser(client: Socket, data: any) {
    console.log(data);
    client.to(data.to).emit('callUser', {
      signal: data.signal,
      from: data.from,
    });
  }

  // accepting user call and coonecting with user

  @SubscribeMessage('answerCall')
  handleAnswerCall(client: Socket, data: any) {
    console.log(data);
    client.to(data.to).emit('callAccepted', data.signal);
  }

  // rejecting aur cal ending
  @SubscribeMessage('callReject')
  handleRejectCall(client: Socket, data: any) {
    console.log(data);
    // client.to(data.to).emit('callReject');
  }
}
