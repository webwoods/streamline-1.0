import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationRecieverModule } from './notification-reciever.module';
import { RequestNotificationModule } from './request-notification.module';
import { NotificationService } from '../services/notifiation.service';
import { RequestNotification } from '../entities/request-notification.entity';
import { NotificationReciever } from '../entities/notification-reciever.entity';
import { NotificationResolver } from '../resolvers/notification.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, RequestNotification, NotificationReciever]),

    NotificationRecieverModule,
    RequestNotificationModule,
  ],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
