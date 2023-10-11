import { Module } from '@nestjs/common';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestResolver, RequestService],
  exports: [RequestService],
})
export class RequestModule {}
