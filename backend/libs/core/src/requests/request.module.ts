import { Module } from '@nestjs/common';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestResolver, RequestService],
  exports: [RequestService],
})
export class RequestModule {}
