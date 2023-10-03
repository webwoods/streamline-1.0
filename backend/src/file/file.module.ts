import { Module } from '@nestjs/common';
import { FileResolver } from './file/file.resolver';
import { FileService } from './file/file.service';

@Module({
  providers: [FileResolver, FileService]
})
export class FileModule {}
