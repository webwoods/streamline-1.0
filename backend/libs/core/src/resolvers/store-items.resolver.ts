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
import { StoreItem } from '../entities/storeItem.entity';
import { StoreItemsService } from '../services/store-items.service';
import { StoreItemPage } from '../entities/dto/storeItemPage.dto';
import { CreateStoreItemsInput } from '../entities/dto/create.store-items';

@Resolver(() => StoreItem)
export class StoreItemsResolver {
    constructor(private readonly storeItemService: StoreItemsService) { }

    // @ResolveField(() => Request, { nullable: true })
    // async requests(
    //   @Parent() requestItem: StoreItem,
    // ): Promise<Request[] | null> {
    //   return requestItem.requests ?? null;
    // }

    @Query(() => StoreItem, { name: 'requestItem' })
    async getStoreItemById(@Args('id') id: string): Promise<StoreItem> {
        try {
            const storeItem = this.storeItemService.findStoreItemById(id);
            if (!storeItem) {
                throw new Error(`Store Item with ID ${id} not found`);
            }
            return storeItem;
        } catch (error: any) {
            throw new Error(`Error fetching store item: ${error.message}`);
        }
    }

    @Query(() => StoreItemPage, { name: 'searchStoreItems' })
    async searchRequestItems(
        @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
        @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
        @Args('searchString', { type: () => String }) searchString: string,
    ): Promise<StoreItemPage> {
        try {
            const skip = (page - 1) * pageSize;
            const storeItems = await this.storeItemService.searchStoreItems(
                searchString,
                skip,
                pageSize,
            );
            const storeItemsPage: StoreItemPage = {
                data: storeItems,
                totalItems: storeItems.length,
            };
            return storeItemsPage;
        } catch (error: any) {
            throw new Error(`Error fetching storeItems: ${error.message}`);
        }
    }

    @Query(() => StoreItemPage, { name: 'storeItems' })
    async getStoreItems(
        @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
        @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    ): Promise<StoreItemPage> {
        try {
            const skip = (page - 1) * pageSize;
            const storeItems = await this.storeItemService.findAllStoreItems(
                skip,
                pageSize,
            );
            const storeItemsPage: StoreItemPage = {
                data: storeItems,
                totalItems: storeItems.length,
            };
            return storeItemsPage;
        } catch (error: any) {
            throw new Error(`Error fetching store items: ${error.message}`);
        }
    }

    @Mutation(() => StoreItem, { name: 'createStoreItem' })
    async createStoreItem(
        @Args('input') input: CreateStoreItemsInput,
    ): Promise<StoreItem | null> {
        try {
            return await this.storeItemService.createStoreItem(input);
        } catch (error: any) {
            throw new Error(`Error creating store item: ${error.message}`);
        }
    }

    @Mutation(() => StoreItem, { name: 'updateStoreItem' })
    async updateStoreItem(
        @Args('id') id: string,
        @Args('input') input: CreateStoreItemsInput,
    ): Promise<StoreItem | null> {
        try {
            return await this.storeItemService.updateStoreItem(id, input);
        } catch (error: any) {
            throw new Error(`Error updating store item: ${error.message}`);
        }
    }

    @Mutation(() => StoreItem, { name: 'deleteStoreItem' })
    async deleteStoreItem(@Args('id') id: string): Promise<StoreItem | null> {
        try {
            return await this.storeItemService.deleteStoreItem(id);
        } catch (error: any) {
            throw new Error(`Error deleting store item: ${error.message}`);
        }
    }

    /**
     * required by graphql federation
     */
    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
        return this.storeItemService.findStoreItemById(reference.id);
    }
}
