import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { File } from 'src/files/file.entity';
import { Request } from './request.entity';
import { RequestService } from './request.service';
import { FileService } from 'src/files/file.service';
import { CreateRequestInput } from './dto/create.request';
import { UpdateRequestInput } from './dto/update.request';
import { UserService } from 'src/users/user.service';

@Resolver(() => Request)
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => File, { nullable: true })
  async file(@Parent() request: Request): Promise<File | null> {
    return request.file || null;
  }

  @Query(() => Request, { name: 'request' })
  async getRequestById(@Args('id') id: string): Promise<Request> {
    return this.requestService.findRequestById(id);
  }

  @Query(() => [Request], { name: 'requests' })
  async getRequests(): Promise<Request[]> {
    const requests = await this.requestService.findAllRequests();
    const requestsWithFiles: Request[] = [];
    await Promise.all(
      requests.map(async (request) => {
        if (request.fileId) {
          request.file = await this.fileService.findFileById(request.fileId);
        }
        requestsWithFiles.push(request);
      }),
    );
    return requestsWithFiles;
  }

  @Query(() => [Request], { name: 'requestByFileId' })
  async getRequestByFileId(@Args('fileId') fileId: string): Promise<Request[]> {
    const requests = await this.requestService.findRequestsByFileId(fileId);
    const requestsWithFiles: Request[] = [];
    const file = await this.fileService.findFileById(fileId);
    await Promise.all(
      requests.map(async (request) => {
        request.file = file;
        requestsWithFiles.push(request);
      }),
    );
    return requestsWithFiles;
  }

  @Query(() => [Request], { name: 'requestByType' })
  async getRequestByType(@Args('requestType') requestType: string): Promise<Request[]> {
    const requests = await this.requestService.findRequestsByFileType(requestType);
    const requestsWithFiles: Request[] = [];
    const file = await this.fileService.findFileById(requestType);
    await Promise.all(
      requests.map(async (request) => {
        request.file = file;
        requestsWithFiles.push(request);
      }),
    );
    return requestsWithFiles;
  }

  @Mutation(() => Request, { name: 'createRequest' })
  async createRequest(@Args('input') input: CreateRequestInput): Promise<Request> {
    const request = new Request();
    if (input.fileId) {
      const file = await this.fileService.findFileById(input.fileId);
      request.fileId = input.fileId;
      request.file = file;
    }
    if (input.requestedUserId) {
      const user = await this.userService.findUserById(input.requestedUserId);
      request.requestedUserId = user.id;
      request.requestedUser = user;
    }
    if (input.requestType) {
      request.requestType = input.requestType;
    }
    if (input.description) {
      request.description = input.description;
    }
    request.createdAt = new Date();
    return this.requestService.createRequest(request);
  }

  @Mutation(() => Request, { name: 'updateRequest' })
  async updateRequest(
    @Args('id') id: string,
    @Args('input') input: UpdateRequestInput,
  ): Promise<Request> {
    const request = await this.getRequestById(id);
    if (input.fileId) {
      const file = await this.fileService.findFileById(input.fileId);
      request.fileId = input.fileId;
      request.file = file;
    }
    if (input.requestedUserId) {
      const user = await this.userService.findUserById(input.requestedUserId);
      request.requestedUserId = user.id;
      request.requestedUser = user;
    }
    if (input.requestType) {
      request.requestType = input.requestType;
    }
    if (input.description) {
      request.description = input.description;
    }
    request.updatedAt = new Date();
    return this.requestService.updateRequest(id, request);
  }

  @Mutation(() => Request, { name: 'deleteRequest' })
  async deleteRequest(@Args('id') id: string): Promise<Request> {
    return this.requestService.deleteRequest(id);
  }
}
