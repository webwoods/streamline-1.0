import { Module } from '@nestjs/common';
import { StoreItemService } from './store-item.service';
import { StoreItemResolver } from './store-item.resolver';

@Module({
  providers: [StoreItemService, StoreItemResolver]
})
export class StoreItemModule {}
