import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
