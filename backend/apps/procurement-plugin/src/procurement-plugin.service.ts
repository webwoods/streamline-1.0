import { gql } from '@apollo/client/core';
import { authApolloClient } from '@libs/core/apollo/client';
import { FileService } from '@libs/core/files/file.service';
import { PropertyService } from '@libs/core/properties/property.service';
import { RequestItemsService } from '@libs/core/request-items/request-items.service';
import { RequestService } from '@libs/core/requests/request.service';
import { Role } from '@libs/core/roles/role.entity';
import { User } from '@libs/core/users/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProcurementPluginService {
  constructor(
    private readonly requestService: RequestService,
    private readonly requestItemService: RequestItemsService,
    private readonly propertyService: PropertyService,
    private readonly fileService: FileService,
  ) {}

  /**
   * This function let a procument user to request a requestItem
   * that is available in the database
   * @returns requestResultUnion
   */
  async requestItem(): Promise<any> {
    return;
  }

  /**
   * This function let a procument user to request a requestItem
   * that is not available in the database
   * @returns requestResultUnion
   */
  async requestNewItem(): Promise<any> {
    return;
  }

  /**
   * This function let a procument user to request a requestItem
   * that is available in the database
   * @returns requestResultUnion
   */
  async requestItems(): Promise<any[]> {
    return;
  }

  /**
   * This function let a procument user to request a requestItem
   * that is not available in the database
   * @returns requestResultUnion
   */
  async requestNewItems(): Promise<any[]> {
    return;
  }

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
   * Lets the user to attach an existing property from teh database,
   * to a request item
   * @returns 
   */
  async addPropertyToRequestItem(): Promise<any> {
    return;
  }

  /**
   * Lets the user to attach a set of existing properties from teh database,
   * to a request item
   * @returns 
   */
  async addPropertiesToRequestItem(): Promise<any> {
    return;
  }

  /**
   * Lets the user to define a new property to a request item
   * @returns 
   */
  async addNewPropertyToRequestItem(): Promise<any> {
    return;
  }

  /**
   * Lets the user to define new set of properties to a request item
   * @returns 
   */
  async addNewPropertiesToRequestItem(): Promise<any> {
    return;
  }

  async removePropertyFromRequestItem(): Promise<any> {
    return;
  }

  async approveRequest(): Promise<any> {
    return;
  }

  async rejectRequest(): Promise<any> {
    return;
  }

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
