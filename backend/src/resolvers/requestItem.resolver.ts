import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateRequestItemInput } from 'src/dto/create.requestItem';
import { UpdateRequestItemInput } from 'src/dto/update.requestItem';
import { RequestItem } from 'src/models/requestItem.entity';
import { RequestItemService } from 'src/services/requestItem.service';

@Resolver(() => RequestItem)
export class RequestItemResolver {
  constructor(private readonly requestItemService: RequestItemService) {}

  @Query(() => RequestItem, { name: 'requestItem' })
  async getRequestItemById(@Args('id') id: string): Promise<RequestItem> {
    return this.requestItemService.findRequestItemById(id);
  }

  @Query(() => [RequestItem], { name: 'requestItems' })
  async getRequestItems(): Promise<RequestItem[]> {
    return this.requestItemService.findAllRequestItems();
  }

  @Mutation(() => RequestItem, { name: 'createRequestItem' })
  async createRequestItem(@Args('input') input: CreateRequestItemInput): Promise<RequestItem> {
    return this.requestItemService.createRequestItem(input);
  }

  @Mutation(() => RequestItem, { name: 'updateRequestItem' })
  async updateRequestItem(
    @Args('id') id: string,
    @Args('input') input: UpdateRequestItemInput,
  ): Promise<RequestItem> {
    return this.requestItemService.updateRequestItem(id, input);
  }

  @Mutation(() => RequestItem, { name: 'deleteRequestItem' })
  async deleteRequestItem(@Args('id') id: string): Promise<RequestItem> {
    return this.requestItemService.deleteRequestItem(id);
  }
}
