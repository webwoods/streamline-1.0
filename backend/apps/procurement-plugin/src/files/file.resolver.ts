import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { CreateFileInput } from './dto/create.file';
import { UpdateFileInput } from './dto/update.file';
import { FileService } from './file.service';
import { File } from './file.entity';
import { Request } from '../requests/request.entity';
import { FilePage } from './dto/filePage.dto';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @ResolveField(() => Request, { nullable: true })
  async requests(@Parent() file: File): Promise<Request[] | null> {
    return file.requests ?? null;
  }

  @Query(() => File, { name: 'file' })
  async getFileById(@Args('id') id: string): Promise<File> {
    try {
      const file = this.fileService.findFileById(id);
      if (!file) {
        throw new Error(`File with ID ${id} not found`);
      }
      return file;
    } catch (error: any) {
      throw new Error(`Error fetching file: ${error.message}`);
    }
  }

  @Query(() => FilePage, { name: 'files' })
  async getUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<FilePage> {
    try {
      const skip = (page - 1) * pageSize;
      const files = await this.fileService.findAllFiles(skip, pageSize);
      const filesPage: FilePage = { data: files, totalItems: files.length };
      return filesPage;
    } catch (error: any) {
      throw new Error(`Error fetching files: ${error.message}`);
    }
  }

  @Mutation(() => File, { name: 'createUser' })
  async createFile(@Args('input') input: CreateFileInput): Promise<File | null> {
    try {
      return await this.fileService.createFile(input);
    } catch (error: any) {
      throw new Error(`Error creating file: ${error.message}`);
    }
  }

  @Mutation(() => File, { name: 'updateFile' })
  async updateFile(
    @Args('id') id: string,
    @Args('input') input: UpdateFileInput,
  ): Promise<File | null> {
    try {
      return await this.fileService.updateFile(id, input);
    } catch (error: any) {
      throw new Error(`Error updating file: ${error.message}`);
    }
  }

  @Mutation(() => File, { name: 'deleteFile' })
  async deleteFile(@Args('id') id: string): Promise<File | null> {
    try {
      return await this.fileService.deleteFile(id);
    } catch (error: any) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.fileService.findFileById(reference.id);
  }
}
