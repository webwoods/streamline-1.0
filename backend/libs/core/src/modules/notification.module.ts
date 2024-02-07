import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  // providers: [RequestResolver, RequestService],
  // exports: [RequestService],
})
export class NotificationModule {}
