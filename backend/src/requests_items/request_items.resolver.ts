import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { File } from 'src/files/file.entity';
import { RequestItems } from './request_items.entity';
import { RequestItemsService } from './request_items.service';
import { FileService } from 'src/files/file.service';
import { CreateRequestItemsInput } from './dto/create.request_items';
import { UpdateRequestItemsInput } from './dto/update.request_items';
import { UserService } from 'src/users/user.service';

@Resolver(() => RequestItems)
export class RequestItemsResolver {
  constructor(
    private readonly requestService: RequestItemsService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => File, { nullable: true })
  async file(@Parent() request: RequestItems): Promise<File | null> {
    return request.file || null;
  }

  @Query(() => RequestItems, { name: 'request' })
  async getRequestById(@Args('id') id: string): Promise<RequestItems> {
    return this.requestService.findRequestById(id);
  }

  @Query(() => [RequestItems], { name: 'requests' })
  async getRequests(): Promise<RequestItems[]> {
    const requests = await this.requestService.findAllRequests();
    const requestsWithFiles: RequestItems[] = [];
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

  @Query(() => [RequestItems], { name: 'requestByFileId' })
  async getRequestByFileId(@Args('fileId') fileId: string): Promise<RequestItems[]> {
    const requests = await this.requestService.findRequestsByFileId(fileId);
    const requestsWithFiles: RequestItems[] = [];
    const file = await this.fileService.findFileById(fileId);
    await Promise.all(
      requests.map(async (request) => {
        request.file = file;
        requestsWithFiles.push(request);
      }),
    );
    return requestsWithFiles;
  }

  @Query(() => [RequestItems], { name: 'requestByType' })
  async getRequestByType(@Args('requestType') requestType: string): Promise<RequestItems[]> {
    const requests = await this.requestService.findRequestsByFileType(requestType);
    const requestsWithFiles: RequestItems[] = [];
    const file = await this.fileService.findFileById(requestType);
    await Promise.all(
      requests.map(async (request) => {
        request.file = file;
        requestsWithFiles.push(request);
      }),
    );
    return requestsWithFiles;
  }

  @Mutation(() => RequestItems, { name: 'createRequest' })
  async createRequest(@Args('input') input: CreateRequestItemsInput): Promise<RequestItems> {
    const request = new RequestItems();
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

  @Mutation(() => RequestItems, { name: 'updateRequest' })
  async updateRequest(
    @Args('id') id: string,
    @Args('input') input: UpdateRequestItemsInput,
  ): Promise<RequestItems> {
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

  @Mutation(() => RequestItems, { name: 'deleteRequest' })
  async deleteRequest(@Args('id') id: string): Promise<RequestItems> {
    return this.requestService.deleteRequest(id);
  }
}
