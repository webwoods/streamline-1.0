import { Module } from '@nestjs/common';
import { FileResolver } from 'src/files/file.resolver';
import { FileService } from './file.service';
// import { FileResolver } from './file/file.resolver';
// import { FileService } from './file/file.service';

@Module({
  providers: [FileResolver, FileService]
})
export class FileModule {}
