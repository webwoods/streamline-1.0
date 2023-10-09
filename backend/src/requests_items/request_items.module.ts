import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItems } from './request_items.entity';
import { UserModule } from 'src/users/user.module';
import { FileModule } from 'src/files/file.module';
import { RequestItemsResolver } from './request_items.resolver';
import { RequestItemsService } from './request_items.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestItems]), UserModule, FileModule],
  providers: [RequestItemsResolver, RequestItemsService],
  exports: [RequestItemsService],
})
export class RequestItemsModule {}
