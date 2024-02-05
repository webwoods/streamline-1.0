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
import { Request } from '../entities/request.entity';
import { RequestService } from '../services/request.service';
import { RequestItem } from '../entities/request-items.entity';
import { RequestPage } from '../entities/dto/requestPage.dto';
import { CreateRequestInput } from '../entities/dto/create.request';
import { UpdateRequestInput } from '../entities/dto/update.request';

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @ResolveField(() => Request, { nullable: true })
  async requestItems(@Parent() request: Request): Promise<RequestItem[] | null> {
    return request.requestItems ?? null;
  }

  @Query(() => Request, { name: 'request' })
  async getRequestById(@Args('id') id: string): Promise<Request> {
    try {
      const request = this.requestService.findRequestById(id);
      if (!request) {
        throw new Error(`Request with ID ${id} not found`);
      }
      return request;
    } catch (error: any) {
      throw new Error(`Error fetching request: ${error.message}`);
    }
  }

  @Query(() => RequestPage, { name: 'requests' })
  async getRequests(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<RequestPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requests = await this.requestService.findAllRequests(skip, pageSize);
      const requestsPage: RequestPage = { data: requests.data, totalItems: requests.count };
      return requestsPage;
    } catch (error: any) {
      throw new Error(`Error fetching requests: ${error.message}`);
    }
  }

  @Mutation(() => Request, { name: 'createRequest' })
  async createRequest(@Args('input') input: CreateRequestInput): Promise<Request | null> {
    try {
      return await this.requestService.createRequest(input);
    } catch (error: any) {
      throw new Error(`Error creating request: ${error.message}`);
    }
  }

  @Mutation(() => Request, { name: 'updateRequest' })
  async updateRequest(
    @Args('id') id: string,
    @Args('input') input: UpdateRequestInput,
  ): Promise<Request | null> {
    try {
      return await this.requestService.updateRequest(id, input);
    } catch (error: any) {
      throw new Error(`Error updating request: ${error.message}`);
    }
  }

  @Mutation(() => Request, { name: 'deleteRequest' })
  async deleteRequest(@Args('id') id: string): Promise<Request | null> {
    try {
      return await this.requestService.deleteRequest(id);
    } catch (error: any) {
      throw new Error(`Error deleting request: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.requestService.findRequestById(reference.id);
  }
}
