import { Module } from '@nestjs/common';
import { RequestResolver } from '../resolvers/request.resolver';
import { RequestService } from '../services/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../entities/request.entity';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    NotificationModule
  ],
  providers: [RequestResolver, RequestService],
  exports: [RequestService],
})
export class RequestModule { }
