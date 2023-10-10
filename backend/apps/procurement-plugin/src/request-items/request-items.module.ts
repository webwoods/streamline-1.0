import { Module } from '@nestjs/common';
import { RequestItemsService } from './request-items.service';
import { RequestItemsResolver } from './request-items.resolver';

@Module({
  providers: [RequestItemsService, RequestItemsResolver]
})
export class RequestItemsModule {}
