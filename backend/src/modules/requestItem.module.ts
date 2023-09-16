import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItem } from 'src/models/requestItem.entity';
import { RequestItemResolver } from 'src/resolvers/requestItem.resolver';
import { RequestItemService } from 'src/services/requestItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestItem])],
  providers: [RequestItemResolver, RequestItemService],
  exports: [RequestItemService],
})
export class RequestItemModule {}
