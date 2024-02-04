import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { RequestItemsService } from '../services/request-items.service';
import { RequestItem } from '../entities/request-items.entity';
import { Request } from '../entities/request.entity';
import { CreateRequestItemInput, CreateRequestItemsInput } from '../entities/dto/create.request-items';
import { UpdateRequestItemsInput } from '../entities/dto/update.request-items';
import { RequestItemPage } from '../entities/dto/requestItemPage.dto';

@Resolver(() => RequestItem)
export class RequestItemsResolver {
  constructor(private readonly requestItemService: RequestItemsService) { }

  @ResolveField(() => Request, { nullable: true })
  async requests(
    @Parent() requestItem: RequestItem,
  ): Promise<Request[] | null> {
    return requestItem.requests ?? null;
  }

  @Query(() => RequestItem, { name: 'requestItem' })
  async getRequestItemById(@Args('id') id: string): Promise<RequestItem> {
    try {
      const request = this.requestItemService.findRequestItemById(id);
      if (!request) {
        throw new Error(`Request Item with ID ${id} not found`);
      }
      return request;
    } catch (error: any) {
      throw new Error(`Error fetching request item: ${error.message}`);
    }
  }

  @Query(() => RequestItemPage, { name: 'searchRequestItems' })
  async searchRequestItems(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('searchString', { type: () => String }) searchString: string,
  ): Promise<RequestItemPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requestItems = await this.requestItemService.searchRequestItems(
        searchString,
        skip,
        pageSize,
      );
      const requestItemsPage: RequestItemPage = {
        data: requestItems,
        totalItems: requestItems.length,
      };
      return requestItemsPage;
    } catch (error: any) {
      throw new Error(`Error fetching request items: ${error.message}`);
    }
  }

  @Query(() => RequestItemPage, { name: 'requestItems' })
  async getRequestItems(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<RequestItemPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requestItems = await this.requestItemService.findAllRequestItems(
        skip,
        pageSize,
      );
      const requestItemsPage: RequestItemPage = {
        data: requestItems,
        totalItems: requestItems.length,
      };
      return requestItemsPage;
    } catch (error: any) {
      throw new Error(`Error fetching request items: ${error.message}`);
    }
  }

  @Mutation(() => RequestItem, { name: 'createRequestItem' })
  async createRequestItem(
    @Args('input') input: CreateRequestItemInput,
  ): Promise<RequestItem | null> {
    try {
      return await this.requestItemService.createRequestItem(input);
    } catch (error: any) {
      throw new Error(`Error creating request item: ${error.message}`);
    }
  }

  @Mutation(() => [RequestItem], { name: 'createRequestItems' })
  async createRequestItems(
    @Args('input') input: CreateRequestItemsInput,
  ): Promise<RequestItem[] | null> {
    try {
      return await this.requestItemService.createRequestItems(input.requestItems);
    } catch (error: any) {
      throw new Error(`Error creating request item: ${error.message}`);
    }
  }

  @Mutation(() => RequestItem, { name: 'updateRequestItem' })
  async updateRequestItem(
    @Args('id') id: string,
    @Args('input') input: UpdateRequestItemsInput,
  ): Promise<RequestItem | null> {
    try {
      return await this.requestItemService.updateRequestItem(id, input);
    } catch (error: any) {
      throw new Error(`Error updating request item: ${error.message}`);
    }
  }

  @Mutation(() => RequestItem, { name: 'deleteRequestItem' })
  async deleteRequestItem(@Args('id') id: string): Promise<RequestItem | null> {
    try {
      return await this.requestItemService.deleteRequestItem(id);
    } catch (error: any) {
      throw new Error(`Error deleting request item: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.requestItemService.findRequestItemById(reference.id);
  }
}
