import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { RequestNotification } from '../entities/request-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestNotification,  ])],
})
export class RequestNotificationModule { }
