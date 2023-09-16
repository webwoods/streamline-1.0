import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { File } from '../models/file.entity';
import { FileService } from 'src/services/file.service';
import { CreateFileInput } from 'src/dto/create.file';
import { UpdateFileInput } from 'src/dto/update.file';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => File, { name: 'file' })
  async getFileById(@Args('id') id: string): Promise<File> {
    return this.fileService.findFileById(id);
  }

  @Query(() => [File], { name: 'files' })
  async getFiles(): Promise<File[]> {
    return await this.fileService.findAllFiles();
  }

  @Query(() => File, { name: 'fileByName' })
  async getFileByRoleId(@Args('name') name: string): Promise<File> {
    return await this.fileService.findFileByFilename(name);
  }

  @Mutation(() => File, { name: 'createFile' })
  async createFile(@Args('input') input: CreateFileInput): Promise<File> {
    const file = new File();
    if (input) {
      file.name = input.name;
      file.createdAt = new Date();
    }
    return this.fileService.createFile(file);
  }

  @Mutation(() => File, { name: 'updateFile' })
  async updateFile(
    @Args('id') id: string,
    @Args('input') input: UpdateFileInput,
  ): Promise<File> {
    const file = await this.fileService.findFileById(id);
    if (input) {
      file.name = input.name;
      file.updatedAt = new Date();
    }
    return this.fileService.updateFile(id, file);
  }

  @Mutation(() => File, { name: 'deleteFile' })
  async deleteFile(@Args('id') id: string): Promise<File> {
    return this.fileService.deleteFile(id);
  }
}
