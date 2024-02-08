import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { NotificationService } from '../services/notifiation.service';
import { RequestNotification } from '../entities/request-notification.entity';
import { RequestNotificationPage } from '../entities/dto/request-notification-page.dto';
import { CreateRequestNotificationInput } from '../entities/dto/create.request-notification';
import { UpdateRequestNotificationInput } from '../entities/dto/update.request-notification';
import { NotificationPage } from '../entities/dto/notification-page.dto';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { RequestItemNotificationPage } from '../entities/dto/request-item-notification-page.dto';
import { CreateRequestItemNotificationInput } from '../entities/dto/create.request-item-notification';
import { UpdateRequestItemNotificationInput } from '../entities/dto/update.request-item-notification';
import { FileNotification } from '../entities/file-notification.entity';
import { FileNotificationPage } from '../entities/dto/file-item-notification-page.dto';
import { CreateFileNotificationInput } from '../entities/dto/create.file-notification copy';
import { UpdateFileNotificationInput } from '../entities/dto/update.file-notification';
import { UserNotification } from '../entities/user-notification.entity';
import { UserNotificationPage } from '../entities/dto/user-item-notification-page.dto';
import { CreateUserNotificationInput } from '../entities/dto/create.user-notification';
import { UpdateUserNotificationInput } from '../entities/dto/update.user-notification';
import { RoleNotification } from '../entities/role-notification.entity';
import { CreateRoleNotificationInput } from '../entities/dto/create.role-notification';
import { UpdateRoleNotificationInput } from '../entities/dto/update.role-notification';
import { RoleNotificationPage } from '../entities/dto/role-notification-page.dto';
@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService
  ) { }

  // @Query(() => NotificationPage, { name: 'notifications' })
  // async getNotifications(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  // ): Promise<NotificationPage> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const notifications = await this.notificationService.findAllRequestNotifications(skip, pageSize);
  //     const notificationPage: NotificationPage = { data: notifications, totalItems: notifications.length };
  //     return notificationPage;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching notifications: ${error.message}`);
  //   }
  // }

  // /// roles notification
  // @Query(() => RoleNotification, { name: 'roleNotification' })
  // async getRoleNotificationById(@Args('id') id: string): Promise<RoleNotification> {
  //   try {
  //     const userNotification = this.notificationService.findRoleNotificationById(id);
  //     if (!userNotification) {
  //       throw new Error(`Request Notification with ID ${id} not found`);
  //     }
  //     return userNotification;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching Request Notification: ${error.message}`);
  //   }
  // }

  // @Query(() => RoleNotificationPage, { name: 'roleNotifications' })
  // async getRoleNotificationsUpdateRoleNotificationInput(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  // ): Promise<RoleNotificationPage> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const userNotifications = await this.notificationService.findAllRoleNotifications(skip, pageSize);
  //     const userNotificationPage: UserNotificationPage = { data: userNotifications, totalItems: userNotifications.length };
  //     return userNotificationPage;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching request notifications: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RoleNotification, { name: 'createRoleNotification' })
  // async createRoleNotification(@Args('input') input: CreateRoleNotificationInput): Promise<RoleNotification | null> {
  //   try {
  //     return await this.notificationService.createRoleNotification(input);
  //   } catch (error: any) {
  //     throw new Error(`Error creating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => FileNotification, { name: 'updateRoleNotification' })
  // async updateRoleNotification(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdateRoleNotificationInput,
  // ): Promise<RoleNotification | null> {
  //   try {
  //     return await this.notificationService.updateRoleNotification(id, input);
  //   } catch (error: any) {
  //     throw new Error(`Error updating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RoleNotification, { name: 'deleteRoleNotification' })
  // async deleteRoleNotification(@Args('id') id: string): Promise<RoleNotification | null> {
  //   try {
  //     return await this.notificationService.deleteRoleNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error deleting request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RoleNotification, { name: 'softDeleteRoleNotification' })
  // async softDeleteRoleNotification(@Args('id') id: string): Promise<RoleNotification | null> {
  //   try {
  //     return await this.notificationService.softDeleteRoleNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error soft-deleting request notification: ${error.message}`);
  //   }
  // }











  // /// file notification
  // @Query(() => UserNotification, { name: 'userNotification' })
  // async getUserNotificationById(@Args('id') id: string): Promise<UserNotification> {
  //   try {
  //     const userNotification = this.notificationService.findUserNotificationById(id);
  //     if (!userNotification) {
  //       throw new Error(`Request Notification with ID ${id} not found`);
  //     }
  //     return userNotification;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching Request Notification: ${error.message}`);
  //   }
  // }

  // @Query(() => UserNotificationPage, { name: 'userNotifications' })
  // async getUserNotificationsUpdateFileNotificationInput(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  // ): Promise<UserNotificationPage> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const userNotifications = await this.notificationService.findAllUserNotifications(skip, pageSize);
  //     const userNotificationPage: UserNotificationPage = { data: userNotifications, totalItems: userNotifications.length };
  //     return userNotificationPage;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching request notifications: ${error.message}`);
  //   }
  // }

  // @Mutation(() => UserNotification, { name: 'createUserNotification' })
  // async createUserNotification(@Args('input') input: CreateUserNotificationInput): Promise<UserNotification | null> {
  //   try {
  //     return await this.notificationService.createUserNotification(input);
  //   } catch (error: any) {
  //     throw new Error(`Error creating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => FileNotification, { name: 'updateUserNotification' })
  // async updateUserNotification(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdateUserNotificationInput,
  // ): Promise<UserNotification | null> {
  //   try {
  //     return await this.notificationService.updateUserNotification(id, input);
  //   } catch (error: any) {
  //     throw new Error(`Error updating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => UserNotification, { name: 'deleteUserNotification' })
  // async deleteUserNotification(@Args('id') id: string): Promise<UserNotification | null> {
  //   try {
  //     return await this.notificationService.deleteUserNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error deleting request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => UserNotification, { name: 'softDeleteUserNotification' })
  // async softDeleteUserNotification(@Args('id') id: string): Promise<UserNotification | null> {
  //   try {
  //     return await this.notificationService.softDeleteUserNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error soft-deleting request notification: ${error.message}`);
  //   }
  // }






  // /// file notification
  // @Query(() => FileNotification, { name: 'fileNotification' })
  // async getFileNotificationById(@Args('id') id: string): Promise<FileNotification> {
  //   try {
  //     const fileNotification = this.notificationService.findFileNotificationById(id);
  //     if (!fileNotification) {
  //       throw new Error(`Request Notification with ID ${id} not found`);
  //     }
  //     return fileNotification;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching Request Notification: ${error.message}`);
  //   }
  // }

  // @Query(() => FileNotificationPage, { name: 'fileNotifications' })
  // async getFileNotificationsUpdateFileNotificationInput(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  // ): Promise<FileNotificationPage> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const fileNotifications = await this.notificationService.findAllFileNotifications(skip, pageSize);
  //     const fileNotificationPage: FileNotificationPage = { data: fileNotifications, totalItems: fileNotifications.length };
  //     return fileNotificationPage;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching request notifications: ${error.message}`);
  //   }
  // }

  // @Mutation(() => FileNotification, { name: 'createFileNotification' })
  // async createFileNotification(@Args('input') input: CreateFileNotificationInput): Promise<FileNotification | null> {
  //   try {
  //     return await this.notificationService.createFileNotification(input);
  //   } catch (error: any) {
  //     throw new Error(`Error creating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => FileNotification, { name: 'updateFileNotification' })
  // async updateFileNotification(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdateFileNotificationInput,
  // ): Promise<FileNotification | null> {
  //   try {
  //     return await this.notificationService.updateFileNotification(id, input);
  //   } catch (error: any) {
  //     throw new Error(`Error updating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => FileNotification, { name: 'deleteFileNotification' })
  // async deleteFileNotification(@Args('id') id: string): Promise<FileNotification | null> {
  //   try {
  //     return await this.notificationService.deleteFileNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error deleting request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestNotification, { name: 'softDeleteFileNotification' })
  // async softDeleteFileNotification(@Args('id') id: string): Promise<FileNotification | null> {
  //   try {
  //     return await this.notificationService.softDeleteFileNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error soft-deleting request notification: ${error.message}`);
  //   }
  // }







  // /// request notification
  // @Query(() => RequestItemNotification, { name: 'requestItemNotification' })
  // async getRequestItemNotificationById(@Args('id') id: string): Promise<RequestItemNotification> {
  //   try {
  //     const requestNotification = this.notificationService.findRequestItemNotificationById(id);
  //     if (!requestNotification) {
  //       throw new Error(`Request Notification with ID ${id} not found`);
  //     }
  //     return requestNotification;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching Request Notification: ${error.message}`);
  //   }
  // }

  // @Query(() => RequestItemNotificationPage, { name: 'requestItemNotifications' })
  // async getRequestItemNotificationsUpdateRequestItemNotificationInput(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  // ): Promise<RequestItemNotificationPage> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const requestItemNotifications = await this.notificationService.findAllRequestItemNotifications(skip, pageSize);
  //     const requestItemNotificationPage: RequestItemNotificationPage = { data: requestItemNotifications, totalItems: requestItemNotifications.length };
  //     return requestItemNotificationPage;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching request notifications: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestItemNotification, { name: 'createRequestItemNotification' })
  // async createRequestItemNotification(@Args('input') input: CreateRequestItemNotificationInput): Promise<RequestItemNotification | null> {
  //   try {
  //     return await this.notificationService.createRequestItemNotification(input);
  //   } catch (error: any) {
  //     throw new Error(`Error creating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestItemNotification, { name: 'updateRequestItemNotification' })
  // async updateRequestItemNotification(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdateRequestItemNotificationInput,
  // ): Promise<RequestItemNotification | null> {
  //   try {
  //     return await this.notificationService.updateRequestItemNotification(id, input);
  //   } catch (error: any) {
  //     throw new Error(`Error updating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestItemNotification, { name: 'deleteRequestItemNotification' })
  // async deleteRequestItemNotification(@Args('id') id: string): Promise<RequestItemNotification | null> {
  //   try {
  //     return await this.notificationService.deleteRequestItemNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error deleting request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestNotification, { name: 'softDeleteRequestItemNotification' })
  // async softDeleteRequestItemNotification(@Args('id') id: string): Promise<RequestItemNotification | null> {
  //   try {
  //     return await this.notificationService.softDeleteRequestItemNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error soft-deleting request notification: ${error.message}`);
  //   }
  // }


  // /// request notification
  // @Query(() => RequestNotification, { name: 'requestNotification' })
  // async getRequestNotificationById(@Args('id') id: string): Promise<RequestNotification> {
  //   try {
  //     const requestNotification = this.notificationService.findRequestNotificationById(id);
  //     if (!requestNotification) {
  //       throw new Error(`Request Notification with ID ${id} not found`);
  //     }
  //     return requestNotification;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching Request Notification: ${error.message}`);
  //   }
  // }

  // @Query(() => RequestNotificationPage, { name: 'requestNotifications' })
  // async getRequestNotifications(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  // ): Promise<RequestNotificationPage> {
  //   try {
  //     const skip = (page - 1) * pageSize;
  //     const requestNotifications = await this.notificationService.findAllRequestNotifications(skip, pageSize);
  //     const requestNotificationPage: RequestNotificationPage = { data: requestNotifications, totalItems: requestNotifications.length };
  //     return requestNotificationPage;
  //   } catch (error: any) {
  //     throw new Error(`Error fetching request notifications: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestNotification, { name: 'createRequestNotification' })
  // async createRequestNotification(@Args('input') input: CreateRequestNotificationInput): Promise<RequestNotification | null> {
  //   try {
  //     return await this.notificationService.createRequestNotification(input);
  //   } catch (error: any) {
  //     throw new Error(`Error creating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestNotification, { name: 'updateRequestNotification' })
  // async updateRequestNotification(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdateRequestNotificationInput,
  // ): Promise<RequestNotification | null> {
  //   try {
  //     return await this.notificationService.updateRequestNotification(id, input);
  //   } catch (error: any) {
  //     throw new Error(`Error updating request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestNotification, { name: 'deleteRequestNotification' })
  // async deleteRequestNotification(@Args('id') id: string): Promise<RequestNotification | null> {
  //   try {
  //     return await this.notificationService.deleteRequestNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error deleting request notification: ${error.message}`);
  //   }
  // }

  // @Mutation(() => RequestNotification, { name: 'softDeleteRequestNotification' })
  // async softDeleteRequestNotification(@Args('id') id: string): Promise<RequestNotification | null> {
  //   try {
  //     return await this.notificationService.softDeleteRequestNotification(id);
  //   } catch (error: any) {
  //     throw new Error(`Error soft-deleting request notification: ${error.message}`);
  //   }
  // }
}
