import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { UserNotification } from '../entities/user-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserNotification])],
})
export class UserNotificationModule {}