import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationRecieverModule } from './notification-reciever.module';
import { RequestNotificationModule } from './request-notification.module';
import { NotificationService } from '../services/notifiation.service';
import { RequestNotification } from '../entities/request-notification.entity';
import { NotificationReciever } from '../entities/notification-reciever.entity';
import { NotificationResolver } from '../resolvers/notification.resolver';
import { FileNotificationModule } from './file-notification.module';
import { FileNotification } from '../entities/file-notification.entity';
import { PropertyNotificationModule } from './property-notification.module';
import { PropertyNotification } from '../entities/property-notification.entity';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { RequestItemNotificationModule } from './reuest-item-notification.module';
import { RoleNotificationModule } from './role-notification.module';
import { RoleNotification } from '../entities/role-notification.entity';
import { UserNotification } from '../entities/user-notification.entity';
import { UserNotificationModule } from './user-notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification, 
      NotificationReciever,

      RequestNotification, 
      FileNotification,
      PropertyNotification, 
      RequestItemNotification,
      
      // RoleNotification,
      // UserNotification
    ]),

    NotificationRecieverModule,
    RequestNotificationModule,
    FileNotificationModule,
    PropertyNotificationModule,
    RequestItemNotificationModule,
    // RoleNotificationModule,
    // UserNotificationModule
  ],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
