import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { PropertyNotification } from '../entities/property-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyNotification])],
})
export class PropertyNotificationModule {}