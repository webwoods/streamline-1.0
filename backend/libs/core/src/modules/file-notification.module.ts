import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { FileNotification } from '../entities/file-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileNotification])],
})
export class FileNotificationModule {}