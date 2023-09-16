import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/models/file.entity';
import { FileResolver } from 'src/resolvers/file.resolver';
import { FileService } from 'src/services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
