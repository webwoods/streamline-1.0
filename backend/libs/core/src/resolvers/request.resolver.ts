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
import { RequestPage } from '../entities/dto/request-page.dto';
import { CreateRequestInput } from '../entities/dto/create.request';
import { UpdateRequestInput } from '../entities/dto/update.request';
import { NotificationService } from '../services/notifiation.service';
import { RequestType } from '../entities/enum/requestType';

@Resolver(() => Request)
export class RequestResolver {
  constructor(
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService
  ) { }

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
    @Args('requestType',{type: ()=> RequestType, nullable: true}) requestType?: RequestType|null,
  ): Promise<RequestPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requests = await this.requestService.findAllRequests(skip, pageSize, requestType);
      const requestsPage: RequestPage = { data: requests.data, totalItems: requests.count };
      return requestsPage;
    } catch (error: any) {
      throw new Error(`Error fetching requests: ${error.message}`);
    }
  }

  @Query(() => RequestPage, { name: 'softDeletedRequests' })
  async getSoftDeletedRequests(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<RequestPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requests = await this.requestService.findAllSoftDeletedRequests(skip, pageSize);
      const requestsPage: RequestPage = { data: requests.data, totalItems: requests.count };
      return requestsPage;
    } catch (error: any) {
      throw new Error(`Error fetching soft-deleted requests: ${error.message}`);
    }
  }


  @Mutation(() => Request, { name: 'createRequest' })
  async createRequest(@Args('input') input: CreateRequestInput): Promise<Request | null> {
    try {
      const request = await this.requestService.createRequest(input);

      if (request) {
        const notification = await this.notificationService.createRequestNotificationWithReceivers(
          request.id, request.requestedUserId, 'New request created.', request.forwardTo
        );

        request.notifications.push(notification);
      }

      return request;
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
      const request = await this.requestService.updateRequest(id, input);

      if (request) {
        const notification = await this.notificationService.createRequestNotificationWithReceivers(
          request.id, request.requestedUserId, 'Request updated.', request.forwardTo
        );

        request.notifications.push(notification);
      }

      return request;
    } catch (error: any) {
      throw new Error(`Error updating request: ${error.message}`);
    }
  }

  @Mutation(() => Request, { name: 'deleteRequest' })
  async deleteRequest(@Args('id') id: string): Promise<Request | null> {
    try {
      const request = await this.requestService.deleteRequest(id);

      if (request) {
        const notification = await this.notificationService.createRequestNotificationWithReceivers(
          request.id, request.requestedUserId, 'Request permanently deleted.', request.forwardTo
        );

        request.notifications.push(notification);
      }

      return request;
    } catch (error: any) {
      throw new Error(`Error deleting request: ${error.message}`);
    }
  }

  @Mutation(() => Request, { name: 'softDeleteRequest' })
  async softDeleteRequest(@Args('id') id: string): Promise<Request | null> {
    try {
      const request = await this.requestService.softDeleteRequest(id);

      if (request) {
        const notification = await this.notificationService.createRequestNotificationWithReceivers(
          request.id, request.requestedUserId, 'Request moved to recycle bin.', request.forwardTo
        );

        request.notifications.push(notification);
      }

      return request;
    } catch (error: any) {
      throw new Error(`Error soft-deleting request: ${error.message}`);
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
