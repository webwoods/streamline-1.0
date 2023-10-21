import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProcurementService } from './procurement.service';
import { NotFoundException } from '@nestjs/common';
import { RequestItem } from '../request-items/request-items.entity';
import { CreatePropertyInput } from '../properties/dto/create.property';
import { File } from '../files/file.entity';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { Request } from '../requests/request.entity';

@Resolver()
export class ProcurementResolver {
  constructor(private readonly procurementService: ProcurementService) {}
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
   * to a request item
   * @returns
   */
  @Mutation(() => RequestItem)
  async addPropertyToRequestItem(
    @Args('propertyId') propertyId: string,
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!propertyId) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addPropertyToRequestItem(
        propertyId,
        requestItemId,
      );
    } catch (error) {
      console.error('Error adding property to request item:', error.message);
      throw new Error(
        'Failed to add property to request item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to attach a set of existing properties
   * from the database, to a request item
   * @returns
   */
  @Mutation(() => RequestItem)
  async addPropertiesToRequestItem(
    @Args('propertyIds', { type: () => [String] }) propertyIds: string[],
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!propertyIds) {
        throw new NotFoundException('Properties not found.');
      }

      return await this.procurementService.addPropertiesToRequestItem(
        propertyIds,
        requestItemId,
      );
    } catch (error) {
      console.error('Error adding properties to request item:', error.message);
      throw new Error(
        'Failed to add properties to request item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to define a new property and
   * add to a request item
   * @returns
   */
  @Mutation(() => RequestItem)
  async addNewPropertyToRequestItem(
    @Args('property') property: CreatePropertyInput,
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!property) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addNewPropertyToRequestItem(
        property,
        requestItemId,
      );
    } catch (error) {
      console.error(
        'Error adding new property to request item:',
        error.message,
      );
      throw new Error(
        'Failed to add new property to request item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to define new set of properties and
   * add to a request item
   * @returns
   */
  @Mutation(() => RequestItem)
  async addNewPropertiesToRequestItem(
    @Args('properties', { type: () => [CreatePropertyInput] })
    properties: CreatePropertyInput[],
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!properties) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addNewPropertiesToRequestItem(
        properties,
        requestItemId,
      );
    } catch (error) {
      console.error(
        'Error adding new properties to request item:',
        error.message,
      );
      throw new Error(
        'Failed to add new properties to request item. Please try again.',
      );
    }
  }

  /**
   * Lets the user to remove a property
   * from a request item
   * @returns
   */
  @Mutation(() => RequestItem)
  async removePropertyFromRequestItem(
    @Args('propertyId')
    propertyId: string,
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!propertyId) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.removePropertyFromRequestItem(
        propertyId,
        requestItemId,
      );
    } catch (error) {
      console.error(
        'Error removing property from request item:',
        error.message,
      );
      throw new Error(
        'Failed to remove property from request item. Please try again.',
      );
    }
  }
  /**
   * Lets the user to remove a set of properties
   * from a request item
   * @returns
   */
  @Mutation(() => RequestItem)
  async removePropertiesFromRequestItem(
    @Args('propertyIds', { type: () => [String] })
    propertyIds: string[],
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!propertyIds) {
        throw new NotFoundException('Properties not found.');
      }

      return await this.procurementService.removePropertiesFromRequestItem(
        propertyIds,
        requestItemId,
      );
    } catch (error) {
      console.error(
        'Error removing properties from request item:',
        error.message,
      );
      throw new Error(
        'Failed to remove properties from request item. Please try again.',
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
  async getRequestWithUser(requestId: string): Promise<Request> {
    try {
      if (!requestId) {
        throw new NotFoundException('Request not found.');
      }
      return await this.procurementService.getRequestWithUser(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => [Request])
  async getRequestsWithUser(skip?: number, take?: number): Promise<Request[]> {
    try {
      return await this.procurementService.getRequestsWithUser();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => [Request])
  async getRequestsForUser(userId: string): Promise<Request[]> {
    try {
      if (!userId) {
        throw new NotFoundException('User not found.');
      }
      return await this.procurementService.getRequestsForUser(userId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
