import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationRecieverModule } from './notification-reciever.module';
import { RequestNotificationModule } from './request-notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),

    NotificationRecieverModule,
    RequestNotificationModule,
  ],
  // providers: [RequestResolver, RequestService],
  // exports: [RequestService],
})
export class NotificationModule {}
