import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { RoleNotification } from '../entities/role-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleNotification])],
})
export class RoleNotificationModule {}