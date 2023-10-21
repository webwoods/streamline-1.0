import { Module } from '@nestjs/common';
import { StoreService } from '../services/store.service';
import { StoreResolver } from '../resolvers/store.resolver';

@Module({
  providers: [StoreService, StoreResolver]
})
export class StoreModule {}
