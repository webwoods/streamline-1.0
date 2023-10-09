import { Module } from '@nestjs/common';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/user.module';
import { FileModule } from 'src/files/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), UserModule, FileModule],
  providers: [RequestResolver, RequestService],
  exports:[RequestService]
})
export class RequestModule {}
