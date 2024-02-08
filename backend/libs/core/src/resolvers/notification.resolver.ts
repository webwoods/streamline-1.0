import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { Request } from '../entities/request.entity';
import { NotificationService } from '../services/notifiation.service';
import { Notification } from '../entities/notification.entity';
import { RequestNotification } from '../entities/request-notification.entity';
import { RequestNotificationPage } from '../entities/dto/request-notification-page.dto';
import { CreateRequestNotificationInput } from '../entities/dto/create.request-notification';
import { UpdateRequestNotificationInput } from '../entities/dto/update.request-notification';
import { NotificationPage } from '../entities/dto/notification-page.dto';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService
  ) { }

  @Query(() => NotificationPage, { name: 'notifications' })
  async getNotifications(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<NotificationPage> {
    try {
      const skip = (page - 1) * pageSize;
      const notifications = await this.notificationService.findAllRequestNotifications(skip, pageSize);
      const notificationPage: NotificationPage = { data: notifications, totalItems: notifications.length };
      return notificationPage;
    } catch (error: any) {
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
  }

  @Query(() => RequestNotification, { name: 'requestNotification' })
  async getRequestNotificationById(@Args('id') id: string): Promise<RequestNotification> {
    try {
      const requestNotification = this.notificationService.findRequestNotificationById(id);
      if (!requestNotification) {
        throw new Error(`Request Notification with ID ${id} not found`);
      }
      return requestNotification;
    } catch (error: any) {
      throw new Error(`Error fetching Request Notification: ${error.message}`);
    }
  }

  @Query(() => RequestNotificationPage, { name: 'requestNotifications' })
  async getRequestNotifications(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<RequestNotificationPage> {
    try {
      const skip = (page - 1) * pageSize;
      const requestNotifications = await this.notificationService.findAllRequestNotifications(skip, pageSize);
      const requestNotificationPage: RequestNotificationPage = { data: requestNotifications, totalItems: requestNotifications.length };
      return requestNotificationPage;
    } catch (error: any) {
      throw new Error(`Error fetching request notifications: ${error.message}`);
    }
  }

  @Mutation(() => RequestNotification, { name: 'createRequestNotification' })
  async createRequestNotification(@Args('input') input: CreateRequestNotificationInput): Promise<RequestNotification | null> {
    try {
      return await this.notificationService.createRequestNotification(input);
    } catch (error: any) {
      throw new Error(`Error creating request notification: ${error.message}`);
    }
  }

  @Mutation(() => RequestNotification, { name: 'updateRequestNotification' })
  async updateRequestNotification(
    @Args('id') id: string,
    @Args('input') input: UpdateRequestNotificationInput,
  ): Promise<RequestNotification | null> {
    try {
      return await this.notificationService.updateRequestNotification(id, input);
    } catch (error: any) {
      throw new Error(`Error updating request notification: ${error.message}`);
    }
  }

  @Mutation(() => RequestNotification, { name: 'deleteRequestNotification' })
  async deleteRequestNotification(@Args('id') id: string): Promise<RequestNotification | null> {
    try {
      return await this.notificationService.deleteRequestNotification(id);
    } catch (error: any) {
      throw new Error(`Error deleting request notification: ${error.message}`);
    }
  }

  @Mutation(() => RequestNotification, { name: 'softDeleteRequestNotification' })
  async softDeleteRequestNotification(@Args('id') id: string): Promise<RequestNotification | null> {
    try {
      return await this.notificationService.softDeleteRequestNotification(id);
    } catch (error: any) {
      throw new Error(`Error soft-deleting request notification: ${error.message}`);
    }
  }
}
