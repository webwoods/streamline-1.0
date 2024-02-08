import { Module } from '@nestjs/common';
import { StoreItemsService } from '../services/store-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreItem } from '../entities/store-item.entity';
import { StoreItemsResolver } from '../resolvers/store-items.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StoreItem])],
  providers: [StoreItemsService, StoreItemsResolver],
  exports: [StoreItemsService],
})
export class StoreItemModule {}
