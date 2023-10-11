import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileService } from '../files/file.service';
import { CreateRequestInput } from './dto/create.request';
import { UpdateRequestInput } from './dto/update.request';
import { Request } from './request.entity';
import { RequestService } from './request.service';
import { UserService } from '@libs/core/users/user.service';

@Resolver(() => Request)
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
  ) {}

  @Query(() => Request, { name: 'request' })
  async getRequestById(@Args('id') id: string): Promise<Request> {
    return this.requestService.findRequestById(id);
  }
}
