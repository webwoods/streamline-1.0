import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationReciever } from '../entities/notification-reciever.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationReciever])],
  // providers: [RequestResolver, RequestService],
  // exports: [RequestService],
})
export class NotificationRecieverModule {}
