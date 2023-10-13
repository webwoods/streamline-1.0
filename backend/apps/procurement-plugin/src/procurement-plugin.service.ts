import { gql } from '@apollo/client/core';
import { authApolloClient } from '@libs/core/apollo/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcurementPluginService {
  getHello(): string {
    return 'Hello World!';
  }

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

  


  // async getUserByIdFromAuth(id: number): Promise<any> {
  //   try {
  //     const { data } = await authApolloClient.query({
  //       query: gql`
  //         query user($id: String!) {
  //           user(id: $id) {
  //             email
  //             id
  //             name
  //             role {
  //               division
  //               id
  //               name
  //             }
  //             username
  //             verified
  //           }
  //         }
  //       `,
  //       variables: { id },
  //     });

  //     // Assuming the structure of the returned data matches your User entity
  //     const user: any = data.getUserByIdFromAuth;

  //     return user;
  //   } catch (error) {
  //     console.error('Error fetching user from auth app:', error);
  //     throw new Error('Failed to fetch user from auth app');
  //   }
  // }
}
