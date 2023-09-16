import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { UserModule } from 'src/users/user.module';
import { FileModule } from 'src/files/file.module';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), UserModule, FileModule],
  providers: [RequestResolver, RequestService],
  exports: [RequestService],
})
export class RequestModule {}
