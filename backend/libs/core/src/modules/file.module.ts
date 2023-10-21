import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileResolver } from '../resolvers/file.resolver';
import { FileService } from '../services/file.service';
import { File } from '../entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
