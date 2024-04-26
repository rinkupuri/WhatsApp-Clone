import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class ChatUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  sender: Record<string, any>; // Assuming sender can be any JSON object

  @Column('json')
  receiver: Record<string, any>; // Assuming receiver can be any JSON object

  @Column('json')
  lastMessage: Record<string, any>; // Assuming last message can be any JSON object

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'integer', default: 0 })
  unread: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('uuid', { unique: true })
  chatId: string;

  @OneToOne(() => ChatRoom, { cascade: true })
  @JoinColumn()
  chatroom: ChatRoom;
}

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { default: [] })
  message: Record<string, any>[]; // Array of JSON objects

  @OneToOne(() => ChatUsers)
  chatusers: ChatUsers;
}
