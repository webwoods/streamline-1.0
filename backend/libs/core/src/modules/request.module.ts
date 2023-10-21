import { Module } from '@nestjs/common';
import { RequestResolver } from '../resolvers/request.resolver';
import { RequestService } from '../services/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestResolver, RequestService],
  exports: [RequestService],
})
export class RequestModule {}
