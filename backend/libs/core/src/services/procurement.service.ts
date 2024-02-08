import { gql } from '@apollo/client/core';
import { apolloClient } from '@libs/core/apollo/client';
import { FileService } from './file.service';
import { PropertyService } from './property.service';
import { RequestItemsService } from './request-items.service';
import { RequestService } from './request.service';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestItem } from '../entities/request-items.entity';
import { Property } from '../entities/property.entity';
import { Request } from '../entities/request.entity';
import { RequestStatus } from '../entities/enum/requestStatus';
import { UserRoles } from '../entities/enum/role';
import { USER_QUERY } from '../apollo/query';
import { StoreItem } from '../entities/store-item.entity';
import { StoreItemsService } from './store-items.service';
import { NotificationService } from './notifiation.service';
import { RequestType } from '../entities/enum/requestType';

@Injectable()
export class ProcurementService {
  constructor(
    private readonly requestService: RequestService,
    private readonly requestItemService: RequestItemsService,
    private readonly storeItemService: StoreItemsService,
    private readonly propertyService: PropertyService,
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService,
  ) { }

  /**
 * This function lets the procurement user to add request items to
 * a request
 * @returns
 */
  async addRequestItemsToRequest(
    requestId: string,
    requestItemIds: string[],
  ): Promise<Request> {
    try {
      const request = await this.requestService.findRequestById(requestId);

      // Map the array of request item IDs to an array of promises
      const updatePromises = requestItemIds.map(async (requestItemId) => {
        const requestItem = await this.requestItemService.findRequestItemById(
          requestItemId,
        );

        // console.log(requestItem); // here store item is queried along with the request item. this is correct.

        requestItem.requests.push(request);
        await this.requestItemService.updateRequestItem(
          requestItemId,
          requestItem,
        );
      });

      // Use Promise.all to wait for all promises to resolve
      await Promise.all(updatePromises);

      return await this.requestService.findRequestById(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This function lets the procurement user to remove request items to
   * a request
   * @returns
   */
  async removeRequestItemsFromRequest(
    requestId: string,
    requestItemIds: string[],
  ): Promise<Request> {
    try {
      const request = await this.requestService.findRequestById(requestId);
      requestItemIds.forEach(async (requestItemId: string) => {
        const requestItem = await this.requestItemService.findRequestItemById(
          requestItemId,
        );

        requestItem.requests = requestItem.requests.filter(
          (request: Request) => request.id !== requestId,
        );
        request.requestItems = request.requestItems.filter(
          (requestItem: RequestItem) => requestItem.id !== requestItemId,
        );

        await this.requestItemService.updateRequestItem(
          requestItemId,
          requestItem,
        );
      });
      return await this.requestService.updateRequest(requestId, request);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This function lets the procurement user to add a request to
   * a file (request collection)
   * @returns
   */
  async addRequestToFile(requestId: string, fileId: string): Promise<Request> {
    try {
      const file = await this.fileService.findFileById(fileId);
      const request = await this.requestService.findRequestById(requestId);
      request.fileId = file.id;
      return await this.requestService.updateRequest(requestId, request);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * This function lets the procurement user to remov a request from
   * a file (request collection)
   * @returns
   */
  async removeRequestFromFile(
    requestId: string,
    fileId: string,
  ): Promise<Request> {
    const request = await this.requestService.findRequestById(requestId);
    if (request.fileId === fileId) {
      request.file = null;
      request.fileId = null;
    }
    return await this.requestService.updateRequest(requestId, request);
  }

  /**
   * Lets the user to attach an existing property from the database,
   * to a store item
   * @returns
   */
  async addPropertyToStoreItem(
    propertyId: string,
    storeItemId: string,
  ): Promise<StoreItem> {
    try {
      const property = await this.propertyService.findPropertyById(propertyId);
      const storeItem = await this.storeItemService.findStoreItemById(
        storeItemId,
      );
      storeItem.properties.push(property);
      return await this.storeItemService.updateStoreItem(
        storeItemId,
        storeItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to attach a set of existing properties
   * from the database, to a store item
   * @returns
   */
  async addPropertiesToStoreItem(
    propertyIds: string[],
    storeItemId: string,
  ): Promise<StoreItem> {
    try {
      const properties = await this.propertyService.findPropertiesByIds(
        propertyIds,
      );
      const storeItem = await this.storeItemService.findStoreItemById(
        storeItemId,
      );

      properties.forEach((property: Property) => {
        storeItem.properties.push(property);
      });

      return await this.storeItemService.updateStoreItem(
        storeItemId,
        storeItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to define a new property and
   * add to a store item
   * @returns
   */
  async addNewPropertyToStoreItem(
    input: Partial<Property>,
    storeItemId: string,
  ): Promise<StoreItem> {
    try {
      const property = await this.propertyService.createProperty(input);
      const storeItem = await this.storeItemService.findStoreItemById(
        storeItemId,
      );
      storeItem.properties.push(property);
      return await this.storeItemService.updateStoreItem(
        storeItemId,
        storeItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to define new set of properties and
   * add to a store item
   * @returns
   */
  async addNewPropertiesToStoreItem(
    input: Partial<Property>[],
    storeItemId: string,
  ): Promise<any> {
    try {
      const storeItem = await this.storeItemService.findStoreItemById(
        storeItemId,
      );

      input.forEach(async (property: Partial<Property>) => {
        storeItem.properties.push(
          await this.propertyService.createProperty(property),
        );
      });

      return await this.storeItemService.updateStoreItem(
        storeItemId,
        storeItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to remove a property
   * from a store item
   * @returns
   */
  async removePropertyFromStoreItem(
    propertyId: string,
    storeItemId: string,
  ): Promise<StoreItem> {
    const storeItem = await this.storeItemService.findStoreItemById(
      storeItemId,
    );

    const propertyToRemove = storeItem.properties.find(
      (property: Property) => property.id === propertyId,
    );

    if (!propertyToRemove) {
      throw new NotFoundException('Property not found in the store item.');
    }

    // Remove the property from the array
    storeItem.properties = storeItem.properties.filter(
      (property: Property) => property.id !== propertyId,
    );

    return await this.storeItemService.updateStoreItem(
      storeItemId,
      storeItem,
    );
  }

  /**
   * Lets the user to remove a set of properties
   * from a store item
   * @returns
   */
  async removePropertiesFromStoreItem(
    propertyIds: string[],
    storeItemId: string,
  ): Promise<StoreItem> {
    const storeItem = await this.storeItemService.findStoreItemById(
      storeItemId,
    );

    const propertiesToRemove = await Promise.all(
      propertyIds.map(async (propertyId: string) => {
        return storeItem.properties.find(
          (property: Property) => property.id === propertyId,
        );
      }),
    );

    if (!propertiesToRemove) {
      throw new NotFoundException(
        'One or pore properties not found in the store item.',
      );
    }

    // Remove the properties from the array
    storeItem.properties = storeItem.properties.filter(
      (property) => !propertiesToRemove.includes(property),
    );

    return await this.storeItemService.updateStoreItem(
      storeItemId,
      storeItem,
    );
  }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Approved'
   * @returns
   */
  async approveRequest(requestId: string): Promise<Request> {
    const request = await this.requestService.findRequestById(requestId);
    request.status = RequestStatus.APPROVED;
    return await this.requestService.updateRequest(requestId, request);
  }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Rejected'
   * @returns
   */
  async rejectRequest(requestId: string): Promise<Request> {
    const request = await this.requestService.findRequestById(requestId);
    request.status = RequestStatus.REJECTED;
    return await this.requestService.updateRequest(requestId, request);
  }

  /**
   * Lets a user to add a descriptive comment to a request
   * @returns
   */
  async addCommentToRequest(): Promise<any> {
    return;
  }

  /**
   * This functions connects to the auth app via the graphql
   * endpoint of the auth app, and retrieves the user that
   * matches the id provided.
   * @param id string
   * @returns User
   */
  async getUserByIdFromAuth(id: string): Promise<User> {
    try {
      const { data } = await apolloClient.query({
        query: USER_QUERY,
        variables: { id },
      });

      const userData: any = data.user;

      if (!userData) {
        throw new NotFoundException();
      }

      const user = new User();
      user.email = userData.email;
      user.id = userData.id;
      user.name = userData.name;
      user.roleId = userData.role?.id;
      user.username = userData.username;
      user.verified = userData.verified;

      if (user.roleId) {
        user.role = await this.getRoleByIdFromAuth(user.roleId);
      }

      return user;
    } catch (error) {
      console.error('Error fetching user from auth app:', error);
      throw new Error('Failed to fetch user from auth app');
    }
  }

  /**
   * This functions connects to the auth app via the graphql
   * endpoint of the auth app, and retrieves the role that
   * matches the id provided.
   * @param id string
   * @returns Role
   */
  async getRoleByIdFromAuth(id: string): Promise<Role> {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query roleById($id: String!) {
            roleById(id: $id) {
              id
              name
              division
            }
          }
        `,
        variables: { id },
      });

      const roleData: any = data.roleById;

      if (!roleData) {
        throw new NotFoundException();
      }

      const role = new Role();
      role.id = roleData.id;
      // Map the received string to the corresponding enum value
      role.name = UserRoles[roleData.name as keyof typeof UserRoles];
      role.division = roleData.division;

      return role;
    } catch (error) {
      console.error('Error fetching role from auth app:', error);
      throw new Error('Failed to fetch role from auth app');
    }
  }

  async getRequestWithUser(requestId: string): Promise<Request> {
    try {
      const request = await this.requestService.findRequestById(requestId);
      if (request.requestedUserId) {
        request.requestedUser = await this.getUserByIdFromAuth(
          request.requestedUserId,
        );
      }
      return request;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRequestsWithUser(skip?: number, take?: number, requestType?: RequestType): Promise<{ data: Request[]; count: number }> {
    try {
      const requests = await this.requestService.findAllRequests(skip, take, requestType);
      const requestsWithUsers = await Promise.all(requests.data.map(async (request: Request) => {
        if (request.requestedUserId) {
          request.requestedUser = await this.getUserByIdFromAuth(request.requestedUserId);
        }
        return request;
      }));
      return { data: requestsWithUsers, count: requests.count };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRequestsForUser(
    userId: string,
    skip?: number,
    take?: number,
  ): Promise<Request[]> {
    try {
      const requests = await this.requestService.findAllRequestsByUserId(
        userId,
        skip,
        take,
      );
      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }
}
