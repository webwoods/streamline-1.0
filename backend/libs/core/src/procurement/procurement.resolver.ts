import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProcurementService } from './procurement.service';
import { Request } from '@libs/core/requests/request.entity';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class ProcurementResolver {
  constructor(
    private readonly procurementService: ProcurementService,
  ) {}

  @Query(() => Request, { name: 'getRequestItem' })
  async getRequestItem(
    @Args('id') id: string,
    @Args('userId') userId: string,
  ): Promise<any> {
    try {
      if (!userId) {
        throw new NotFoundException(
          'User not found. The request is not permitted.',
        );
      }

      if (!id) {
        throw new NotFoundException(
          'Requested Item not found. The request is not permitted.',
        );
      }

      return await this.procurementService.getRequestItem(id, userId);
    } catch (error) {
      console.error('Error requesting the Item:', error.message);
      throw new Error('Failed to request item. Please try again.');
    }
  }

  /**
   * This function let a procument user to request a requestItem
   * that is not available in the database
   * @returns requestResultUnion
   */
  // async requestNewItem(): Promise<any> {
  //   return;
  // }

  /**
   * This function let a procument user to request a requestItem
   * that is available in the database
   * @returns requestResultUnion
   */
  // async requestItems(): Promise<any[]> {
  //   return;
  // }

  /**
   * This function let a procument user to request a requestItem
   * that is not available in the database
   * @returns requestResultUnion
   */
  // async requestNewItems(): Promise<any[]> {
  //   return;
  // }

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
  // async addPropertyToRequestItem(): Promise<any> {
  //   return;
  // }

  /**
   * Lets the user to attach a set of existing properties
   * from the database, to a request item
   * @returns
   */
  // async addPropertiesToRequestItem(): Promise<any> {
  //   return;
  // }

  /**
   * Lets the user to define a new property and
   * add to a request item
   * @returns
   */
  // async addNewPropertyToRequestItem(): Promise<any> {
  //   return;
  // }

  /**
   * Lets the user to define new set of properties and
   * add to a request item
   * @returns
   */
  // async addNewPropertiesToRequestItem(): Promise<any> {
  //   return;
  // }

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
