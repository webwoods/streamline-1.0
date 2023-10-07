import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RequestService } from 'src/requests/request.service';
import { FileService } from './file.service';
import { UserService } from 'src/users/user.service';

@Resolver()
export class FileResolver {
  [x: string]: any;
  constructor(
    private readonly requestService: RequestService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}
  @Query(() => [File], { name: 'files' })
  async getFileById(@Args('id') id: string): Promise<File> {
    return await this.FileService.findFileById();
  }
}
