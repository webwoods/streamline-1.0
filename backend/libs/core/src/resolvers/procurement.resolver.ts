import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProcurementService } from '../services/procurement.service';
import { NotFoundException } from '@nestjs/common';
import { RequestItem } from '../entities/request-items.entity';
import { CreatePropertyInput } from '../entities/dto/create.property';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Request } from '../entities/request.entity';
import { RequestPage } from '../entities/dto/request-page.dto';
import { StoreItem } from '../entities/store-item.entity';
import { RequestType } from '../entities/enum/requestType';
import { NotificationPage } from '../entities/dto/notification-page.dto';

@Resolver()
export class ProcurementResolver {
  constructor(private readonly procurementService: ProcurementService) { }
  @Mutation(() => Request)
  async addRequestItemsToRequest(
    @Args('requestId') requestId: string,
    @Args('requestItemIds', { type: () => [String] }) requestItemIds: string[],
  ): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }

      if (!requestItemIds) {
        throw new NotFoundException('Request items not found.');
      }

      return await this.procurementService.addRequestItemsToRequest(
        requestId,
        requestItemIds,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Request)
  async removeRequestItemsFromRequest(
    @Args('requestId') requestId: string,
    @Args('requestItemIds', { type: () => [String] }) requestItemIds: string[],
  ): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }

      if (!requestItemIds) {
        throw new NotFoundException('Request items not found.');
      }

      return await this.procurementService.removeRequestItemsFromRequest(
        requestId,
        requestItemIds,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This function lets the procurement user to add a request to
   * a file (request collection)
   * @returns
   */
  @Mutation(() => Request)
  async addRequestToFile(
    @Args('requestId') requestId: string,
    @Args('fileId') fileId: string,
  ): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }

      if (!fileId) {
        throw new NotFoundException('File not found.');
      }

      return await this.procurementService.addRequestToFile(requestId, fileId);
    } catch (error) {
      console.error('Error adding request to file:', error.message);
      throw new Error('Failed to add request to file. Please try again.');
    }
  }

  /**
   * This function lets the procurement user to remov a request from
   * a file (request collection)
   * @returns
   */
  @Mutation(() => Request)
  async removeRequestFromFile(
    @Args('requestId') requestId: string,
    @Args('fileId') fileId: string,
  ): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }

      if (!fileId) {
        throw new NotFoundException('File not found.');
      }

      return await this.procurementService.removeRequestFromFile(
        requestId,
        fileId,
      );
    } catch (error) {
      console.error('Error removing request to file:', error.message);
      throw new Error('Failed to remove to file. Please try again.');
    }
  }

  /**
   * Lets the user to attach an existing property from teh database,
   * to a store item
   * @returns
   */
  @Mutation(() => StoreItem)
  async addPropertyToStoreItem(
    @Args('propertyId') propertyId: string,
    @Args('storeItemId') storeItemId: string,
  ): Promise<StoreItem> {
    try {
      if (!storeItemId) {
        throw new NotFoundException('Store Item not found.');
      }

      if (!propertyId) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addPropertyToStoreItem(
        propertyId,
        storeItemId,
      );
    } catch (error) {
      console.error('Error adding property to store item:', error.message);
      throw new Error(
        'Failed to add property to store item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to attach a set of existing properties
   * from the database, to a store item
   * @returns
   */
  @Mutation(() => StoreItem)
  async addPropertiesToStoreItem(
    @Args('propertyIds', { type: () => [String] }) propertyIds: string[],
    @Args('storeItemId') storeItemId: string,
  ): Promise<StoreItem> {
    try {
      if (!storeItemId) {
        throw new NotFoundException('Store Item not found.');
      }

      if (!propertyIds) {
        throw new NotFoundException('Properties not found.');
      }

      return await this.procurementService.addPropertiesToStoreItem(
        propertyIds,
        storeItemId,
      );
    } catch (error) {
      console.error('Error adding properties to store item:', error.message);
      throw new Error(
        'Failed to add properties to store item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to define a new property and
   * add to a store item
   * @returns
   */
  @Mutation(() => StoreItem)
  async addNewPropertyToStoreItem(
    @Args('property') property: CreatePropertyInput,
    @Args('storeItemId') storeItemId: string,
  ): Promise<StoreItem> {
    try {
      if (!storeItemId) {
        throw new NotFoundException('Store Item not found.');
      }

      if (!property) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addNewPropertyToStoreItem(
        property,
        storeItemId,
      );
    } catch (error) {
      console.error(
        'Error adding new property to store item:',
        error.message,
      );
      throw new Error(
        'Failed to add new property to store item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to define new set of properties and
   * add to a store item
   * @returns
   */
  @Mutation(() => StoreItem)
  async addNewPropertiesToStoreItem(
    @Args('properties', { type: () => [CreatePropertyInput] })
    properties: CreatePropertyInput[],
    @Args('storeItemId') storeItemId: string,
  ): Promise<StoreItem> {
    try {
      if (!storeItemId) {
        throw new NotFoundException('Store Item not found.');
      }

      if (!properties) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addNewPropertiesToStoreItem(
        properties,
        storeItemId,
      );
    } catch (error) {
      console.error(
        'Error adding new properties to store item:',
        error.message,
      );
      throw new Error(
        'Failed to add new properties to store item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to remove a property
   * from a store item
   * @returns
   */
  @Mutation(() => StoreItem)
  async removePropertyFromStoreItem(
    @Args('propertyId')
    propertyId: string,
    @Args('storeItemId') storeItemId: string,
  ): Promise<StoreItem> {
    try {
      if (!storeItemId) {
        throw new NotFoundException('Store Item not found.');
      }

      if (!propertyId) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.removePropertyFromStoreItem(
        propertyId,
        storeItemId,
      );
    } catch (error) {
      console.error(
        'Error removing property from store item:',
        error.message,
      );
      throw new Error(
        'Failed to remove property from store item. Please try again.',
      );
    }
  }
  /**
   * Lets the user to remove a set of properties
   * from a store item
   * @returns
   */
  @Mutation(() => StoreItem)
  async removePropertiesFromStoreItem(
    @Args('propertyIds', { type: () => [String] })
    propertyIds: string[],
    @Args('storeItemId') storeItemId: string,
  ): Promise<StoreItem> {
    try {
      if (!storeItemId) {
        throw new NotFoundException('Store Item not found.');
      }

      if (!propertyIds) {
        throw new NotFoundException('Properties not found.');
      }

      return await this.procurementService.removePropertiesFromStoreItem(
        propertyIds,
        storeItemId,
      );
    } catch (error) {
      console.error(
        'Error removing properties from store item:',
        error.message,
      );
      throw new Error(
        'Failed to remove properties from store item. Please try again.',
      );
    }
  }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Approved'
   * @returns
   */
  @Mutation(() => Request)
  async approveRequest(@Args('requestId') requestId: string): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }
      return await this.procurementService.approveRequest(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Rejected'
   * @returns
   */
  @Mutation(() => Request)
  async rejectRequest(@Args('requestId') requestId: string): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }
      return await this.procurementService.rejectRequest(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets a user to add a descriptive comment to a request
   * @returns
   */
  // async addCommentToRequest(): Promise<any> {
  //   return;
  // }

  /**
   * Retrieves a user from the auth plugin
   * @param id
   */
  @Query(() => User, {
    description:
      'retrieves a user from the auth plugin when the userId is given.',
  })
  async getUserByIdFromAuth(@Args('userId') userId: string): Promise<User> {
    try {
      return await this.procurementService.getUserByIdFromAuth(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Retrieves a role from the auth plugin
   * @param id
   */
  @Query(() => Role, {
    description:
      'retrieves a role from the auth plugin when the roleId is given.',
  })
  async getRoleByIdFromAuth(@Args('roleId') roleId: string): Promise<Role> {
    try {
      return await this.procurementService.getRoleByIdFromAuth(roleId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => Request)
  async getRequestWithUser(
    @Args('requestId') requestId: string,
  ): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }
      return await this.procurementService.getRequestWithUser(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => RequestPage)
  async getRequestsWithUser(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('requestType', { type: () => RequestType, nullable: true }) requestType: RequestType | null,
  ): Promise<RequestPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requests = await this.procurementService.getRequestsWithUser(
        skip,
        pageSize,
        requestType
      );
      const requestPage: RequestPage = {
        data: requests.data,
        totalItems: requests.count,
      };
      return requestPage;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => NotificationPage)
  async getNotificationsWithUser(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
    @Args('type', { type: () => String, nullable: true }) type: string | null,
  ): Promise<NotificationPage> {
    try {
      const skip = (page - 1) * pageSize;
      const notifications = await this.procurementService.getNotificationsWithUsers(
        skip,
        pageSize,
        type
      );
      const notificationPage: NotificationPage = {
        data: notifications.data,
        totalItems: notifications.count,
      };
      return notificationPage;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => RequestPage)
  async getRequestsForUser(
    @Args('userId') userId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<RequestPage> {
    try {
      if (!userId) {
        throw new NotFoundException('User not found.');
      }
      const skip = (page - 1) * pageSize;
      const requests = await this.procurementService.getRequestsForUser(
        userId,
        skip,
        pageSize,
      );
      const requestPage: RequestPage = {
        data: requests,
        totalItems: requests.length,
      };
      return requestPage;
    } catch (error) {
      throw new Error(error);
    }
  }
}
