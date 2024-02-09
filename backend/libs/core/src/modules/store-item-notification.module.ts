import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreItemNotification } from '../entities/store-item-notification.entity';
@Module({
  imports: [TypeOrmModule.forFeature([StoreItemNotification])],
})
export class StoreItemNotificationModule {}