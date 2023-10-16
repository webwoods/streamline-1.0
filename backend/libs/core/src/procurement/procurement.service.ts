import { gql } from '@apollo/client/core';
import { authApolloClient } from '@libs/core/apollo/client';
import { FileService } from '@libs/core/files/file.service';
import { PropertyService } from '@libs/core/properties/property.service';
import { RequestItemsService } from '@libs/core/request-items/request-items.service';
import { RequestService } from '@libs/core/requests/request.service';
import { Role } from '@libs/core/roles/role.entity';
import { User } from '@libs/core/users/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestItem } from '../request-items/request-items.entity';
import { Property } from '../properties/property.entity';

@Injectable()
export class ProcurementService {
  constructor(
    private readonly requestService: RequestService,
    private readonly requestItemService: RequestItemsService,
    private readonly propertyService: PropertyService,
    private readonly fileService: FileService,
  ) {}

  /**
   * This function lets the procurement user to add a request to
   * a file (request collection)
   * @returns
   */
  async addRequestToFile(): Promise<any> {
    return;
  }

  /**
   * This function lets the procurement user to remov a request from
   * a file (request collection)
   * @returns
   */
  async removeRequestFromFile(): Promise<any> {
    return;
  }

  /**
   * Lets the user to attach an existing property from the database,
   * to a request item
   * @returns
   */
  async addPropertyToRequestItem(
    propertyId: string,
    requestItemId: string,
  ): Promise<RequestItem> {
    try {
      const property = await this.propertyService.findPropertyById(propertyId);
      const requestItem = await this.requestItemService.findRequestItemById(
        requestItemId,
      );
      requestItem.properties.push(property);
      return await this.requestItemService.updateRequestItem(
        requestItemId,
        requestItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to attach a set of existing properties
   * from the database, to a request item
   * @returns
   */
  async addPropertiesToRequestItem(
    propertyIds: string[],
    requestItemId: string,
  ): Promise<RequestItem> {
    try {
      const properties = await this.propertyService.findPropertiesByIds(
        propertyIds,
      );
      const requestItem = await this.requestItemService.findRequestItemById(
        requestItemId,
      );

      properties.forEach((property: Property) => {
        requestItem.properties.push(property);
      });

      return await this.requestItemService.updateRequestItem(
        requestItemId,
        requestItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to define a new property and
   * add to a request item
   * @returns
   */
  async addNewPropertyToRequestItem(
    input: Partial<Property>,
    requestItemId: string,
  ): Promise<RequestItem> {
    try {
      const property = await this.propertyService.createProperty(input);
      const requestItem = await this.requestItemService.findRequestItemById(
        requestItemId,
      );
      requestItem.properties.push(property);
      return await this.requestItemService.updateRequestItem(
        requestItemId,
        requestItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to define new set of properties and
   * add to a request item
   * @returns
   */
  async addNewPropertiesToRequestItem(
    input: Partial<Property>[],
    requestItemId: string,
  ): Promise<any> {
    try {
      const requestItem = await this.requestItemService.findRequestItemById(
        requestItemId,
      );

      input.forEach(async (property: Partial<Property>) => {
        requestItem.properties.push(
          await this.propertyService.createProperty(property),
        );
      });

      return await this.requestItemService.updateRequestItem(
        requestItemId,
        requestItem,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Lets the user to remove a property
   * from a request item
   * @returns
   */
  async removePropertyFromRequestItem(
    propertyId: string,
    requestItemId: string,
  ): Promise<RequestItem> {
    const requestItem = await this.requestItemService.findRequestItemById(
      requestItemId,
    );

    const propertyToRemove = requestItem.properties.find(
      (property: Property) => property.id === propertyId,
    );

    if (!propertyToRemove) {
      throw new NotFoundException('Property not found in the request item.');
    }

    // Remove the property from the array
    requestItem.properties = requestItem.properties.filter(
      (property: Property) => property.id !== propertyId,
    );

    return await this.requestItemService.updateRequestItem(
      requestItemId,
      requestItem,
    );
  }

  /**
   * Lets the user to remove a set of properties
   * from a request item
   * @returns
   */
  async removePropertiesFromRequestItem(): Promise<any> {
    return;
  }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Approved'
   * @returns
   */
  async approveRequest(): Promise<any> {
    return;
  }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Rejected'
   * @returns
   */
  async rejectRequest(): Promise<any> {
    return;
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
      const { data } = await authApolloClient.query({
        query: gql`
          query user($id: String!) {
            user(id: $id) {
              email
              id
              name
              role {
                division
                id
                name
              }
              username
              verified
            }
          }
        `,
        variables: { id },
      });

      const userData: any = data.getUserByIdFromAuth;

      if (!userData) {
        throw new NotFoundException();
      }

      const user = new User();
      user.email = userData.email;
      user.id = userData.id;
      user.name = userData.name;
      user.roleId = userData.role.id;
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
      const { data } = await authApolloClient.query({
        query: gql`
          query role($id: String!) {
            role(id: $id) {
              id
              name
              division
            }
          }
        `,
        variables: { id },
      });

      const roleData: any = data.getUserByIdFromAuth;

      if (!roleData) {
        throw new NotFoundException();
      }

      const role = new Role();
      role.id = roleData.id;
      role.name = roleData.name;
      role.division = roleData.division;

      return role;
    } catch (error) {
      console.error('Error fetching role from auth app:', error);
      throw new Error('Failed to fetch role from auth app');
    }
  }
}
