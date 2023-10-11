import { Module } from '@nestjs/common';
import { RequestItemsService } from './request-items.service';
import { RequestItemsResolver } from './request-items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItem } from './request-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestItem])],
  providers: [RequestItemsService, RequestItemsResolver],
  exports: [RequestItemsService],
})
export class RequestItemsModule {}
