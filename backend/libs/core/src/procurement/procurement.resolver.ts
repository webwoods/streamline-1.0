import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProcurementService } from './procurement.service';
import { Request } from '@libs/core/requests/request.entity';
import { NotFoundException } from '@nestjs/common';
import { RequestItem } from '../request-items/request-items.entity';
import { Property } from '../properties/property.entity';
import { CreatePropertyInput } from '../properties/dto/create.property';

@Resolver()
export class ProcurementResolver {
  constructor(private readonly procurementService: ProcurementService) {}
  /**
   * This function lets the procurement user to add a request to
   * a file (request collection)
   * @returns
   */
  // async addRequestToFile(): Promise<any> {
  //   return;
  // }

  /**
   * This function lets the procurement user to remov a request from
   * a file (request collection)
   * @returns
   */
  // async removeRequestFromFile(): Promise<any> {
  //   return;
  // }

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
      console.error('Error adding new property to request item:', error.message);
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
    @Args('properties', { type: () => [CreatePropertyInput] }) properties: CreatePropertyInput[],
    @Args('requestItemId') requestItemId: string,
  ): Promise<RequestItem> {
    try {
      if (!requestItemId) {
        throw new NotFoundException('Request Item not found.');
      }

      if (!properties) {
        throw new NotFoundException('Property not found.');
      }

      return await this.procurementService.addNewPropertiesToRequestItem(properties, requestItemId);
    } catch (error) {
      console.error('Error adding new properties to request item:', error.message);
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
  // async removePropertyFromRequestItem(): Promise<any> {
  //   return;
  // }

  /**
   * Lets the user to remove a set of properties
   * from a request item
   * @returns
   */
  // async removePropertiesFromRequestItem(): Promise<any> {
  //   return;
  // }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Approved'
   * @returns
   */
  // async approveRequest(): Promise<any> {
  //   return;
  // }

  /**
   * Lets authorized administrators to change the status
   * of a request to 'Rejected'
   * @returns
   */
  // async rejectRequest(): Promise<any> {
  //   return;
  // }

  /**
   * Lets a user to add a descriptive comment to a request
   * @returns
   */
  // async addCommentToRequest(): Promise<any> {
  //   return;
  // }
}
