import { Module } from '@nestjs/common';
import { RequestItemsService } from '../services/request-items.service';
import { RequestItemsResolver } from '../resolvers/request-items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItem } from '../entities/request-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestItem])],
  providers: [RequestItemsService, RequestItemsResolver],
  exports: [RequestItemsService],
})
export class RequestItemsModule {}
