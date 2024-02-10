import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { RequestNotification } from '../entities/request-notification.entity';
import { NotificationReciever } from '../entities/notification-reciever.entity';
import { RequestItemNotification } from '../entities/request-item-notification.entity';
import { UserNotification } from '../entities/user-notification.entity';
import { RoleNotification } from '../entities/role-notification.entity';
import { FileNotification } from '../entities/file-notification.entity';
import { PropertyNotification } from '../entities/property-notification.entity';
import { StoreItemNotification } from '../entities/store-item-notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(NotificationReciever)
    private readonly notificationRecieverRepository: Repository<NotificationReciever>,

    @InjectRepository(RequestNotification)
    private readonly requestNotificationRepository: Repository<RequestNotification>,

    @InjectRepository(RequestItemNotification)
    private readonly requestItemNotificationRepository: Repository<RequestItemNotification>,

    @InjectRepository(StoreItemNotification)
    private readonly storeItemNotificationRepository: Repository<StoreItemNotification>,

    @InjectRepository(FileNotification)
    private readonly fileNotificationRepository: Repository<FileNotification>,

    @InjectRepository(PropertyNotification)
    private readonly propertyNotificationRepository: Repository<PropertyNotification>,

    // @InjectRepository(UserNotification)
    // private readonly userNotificationRepository: Repository<UserNotification>,

    // @InjectRepository(RoleNotification)
    // private readonly roleNotificationRepository: Repository<RoleNotification>,
  ) { }
  
//Notification
  async findAllNotifications(skip: number, take: number): Promise<Notification[]> {
    const data = await this.notificationRepository.find({
      skip,
      take,
      relations: {recievers:true},
    });
    return data;
  }

  // Notificaitions

  async findAllNotifications(skip: number, take: number): Promise<Notification[]> {
    const data = await this.notificationRepository.find({
      skip,
      take,
      relations: { recievers: true },
    });
    return data;
  }

  // Linked

  // async createRoleNotificationWithReceivers(
  //   roleId: string,
  //   senderId: string,
  //   message: string,
  //   sendTo?: string[],
  // ): Promise<RoleNotification | null> {
  //   try {
  //     const notification = await this.createRoleNotification({
  //       roleId: roleId,
  //       message: message,
  //       senderId: senderId,
  //     });

  //     const receivers = [...(sendTo ?? []), senderId].map((receiverId) => ({
  //       isRead: false,
  //       recieverId: receiverId,
  //       notificationId: notification.id,
  //     }));

  //     const createdReceivers = await this.createNotificationReceivers(receivers);
  //     notification.recievers = createdReceivers;

  //     return notification;
  //   } catch (error: any) {
  //     console.error(`Error creating role notification with recievers: ${error.message}`);
  //     return null;
  //   }
  // }

  // async createUserNotificationWithReceivers(
  //   userId: string,
  //   senderId: string,
  //   message: string,
  //   sendTo?: string[],
  // ): Promise<UserNotification | null> {
  //   try {
  //     const notification = await this.createUserNotification({
  //       userId: userId,
  //       message: message,
  //       senderId: senderId,
  //     });

  //     const receivers = [...(sendTo ?? []), senderId].map((receiverId) => ({
  //       isRead: false,
  //       recieverId: receiverId,
  //       notificationId: notification.id,
  //     }));

  //     const createdReceivers = await this.createNotificationReceivers(receivers);
  //     notification.recievers = createdReceivers;

  //     return notification;
  //   } catch (error: any) {
  //     console.error(`Error creating user notification with recievers: ${error.message}`);
  //     return null;
  //   }
  // }

  async createFileItemNotificationWithReceivers(
    fileId: string,
    senderId: string,
    message: string,
    sendTo?: string[],
  ): Promise<FileNotification | null> {
    try {
      const notification = await this.createFileNotification({
        fileId: fileId,
        message: message,
        senderId: senderId,
      });

      const receivers = [...(sendTo ?? []), senderId].map((receiverId) => ({
        isRead: false,
        recieverId: receiverId,
        notificationId: notification.id,
      }));

      const createdReceivers = await this.createNotificationReceivers(receivers);
      notification.recievers = createdReceivers;

      return notification;
    } catch (error: any) {
      console.error(`Error creating file notification with recievers: ${error.message}`);
      return null;
    }
  }

  async createRequestItemNotificationWithReceivers(
    requestItemId: string,
    senderId: string,
    message: string,
    sendTo?: string[],
  ): Promise<RequestItemNotification | null> {
    try {
      const notification = await this.createRequestItemNotification({
        requestItemId: requestItemId,
        message: message,
        senderId: senderId,
      });

      const receivers = [...(sendTo ?? []), senderId].map((receiverId) => ({
        isRead: false,
        recieverId: receiverId,
        notificationId: notification.id,
      }));

      const createdReceivers = await this.createNotificationReceivers(receivers);
      notification.recievers = createdReceivers;

      return notification;
    } catch (error: any) {
      console.error(`Error creating request item notification with recievers: ${error.message}`);
      return null;
    }
  }

  async createStoreItemNotificationWithReceivers(
    storeItemId: string,
    senderId: string,
    message: string,
    sendTo?: string[],
  ): Promise<StoreItemNotification | null> {
    try {
      const notification = await this.createStoreItemNotification({
        storeItemId: storeItemId,
        message: message,
        senderId: senderId,
      });

      const receivers = [...(sendTo ?? []), senderId].map((receiverId) => ({
        isRead: false,
        recieverId: receiverId,
        notificationId: notification.id,
      }));

      const createdReceivers = await this.createNotificationReceivers(receivers);
      notification.recievers = createdReceivers;

      return notification;
    } catch (error: any) {
      console.error(`Error creating store item notification with recievers: ${error.message}`);
      return null;
    }
  }

  async createRequestNotificationWithReceivers(
    requestId: string,
    senderId: string,
    message: string,
    sendTo?: string[],
  ): Promise<RequestNotification | null> {
    try {
      const notification = await this.createRequestNotification({
        requestId: requestId,
        message: message,
        senderId: senderId,
      });

      const receivers = [...(sendTo ?? []), senderId].map((receiverId) => ({
        isRead: false,
        recieverId: receiverId,
        notificationId: notification.id,
      }));

      const createdReceivers = await this.createNotificationReceivers(receivers);
      notification.recievers = createdReceivers;

      return notification;
    } catch (error: any) {
      console.error(`Error creating request notification with recievers: ${error.message}`);
      return null;
    }
  }

  // file Notifications

  async findAllFileNotifications(skip: number, take: number): Promise<FileNotification[]> {
    const data = await this.fileNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, file: true },
    });
    return data;
  }

  async findFileNotificationById(id: string): Promise<FileNotification | null> {
    return await this.fileNotificationRepository.findOne({
      relations: { recievers: true, file: true },
      where: { id },
    });
  }

  async createFileNotification(input: Partial<FileNotification>): Promise<FileNotification | null> {
    const fileNotification = this.fileNotificationRepository.create(input);
    const createdFileNotification = await this.fileNotificationRepository.save(fileNotification);
    return await this.fileNotificationRepository.findOne({
      relations: { recievers: true, file: true },
      where: { id: createdFileNotification.id },
    });
  }

  async updateFileNotification(id: string, input: Partial<FileNotification>): Promise<FileNotification | null> {
    const fileNotification = await this.fileNotificationRepository.findOne({
      relations: { recievers: true, file: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!fileNotification) {
      throw new NotFoundException(`File Notification with id ${id} not found`);
    }

    Object.assign(fileNotification, input);

    await this.fileNotificationRepository.save(fileNotification);
    return await this.findFileNotificationById(id);
  }

  async deleteFileNotification(id: string): Promise<FileNotification | null> {
    const fileNotification = await this.fileNotificationRepository.findOne({
      relations: { recievers: true, file: true },
      where: { id },
    });
    await this.fileNotificationRepository.delete(id);
    return fileNotification;
  }

  async softDeleteFileNotification(id: string): Promise<FileNotification | null> {
    const fileNotification = await this.fileNotificationRepository.findOne({
      relations: { recievers: true, file: true },
      where: { id },
    });
    await this.fileNotificationRepository.softDelete(id);
    return fileNotification;
  }

  // Request Item Notifications

  async findAllRequestItemNotifications(skip: number, take: number): Promise<RequestItemNotification[]> {
    const data = await this.requestItemNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, requestItem: true },
    });
    return data;
  }

  async findRequestItemNotificationById(id: string): Promise<RequestItemNotification | null> {
    return await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, requestItem: true },
      where: { id },
    });
  }

  async createRequestItemNotification(input: Partial<RequestItemNotification>): Promise<RequestItemNotification | null> {
    const requestItemNotification = this.requestItemNotificationRepository.create(input);
    const createdRequestItemNotification = await this.requestItemNotificationRepository.save(requestItemNotification);
    return await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, requestItem: true },
      where: { id: createdRequestItemNotification.id },
    });
  }

  async updateRequestItemNotification(id: string, input: Partial<RequestItemNotification>): Promise<RequestItemNotification | null> {
    const requestItemNotification = await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, requestItem: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!requestItemNotification) {
      throw new NotFoundException(`Request Item Notification with id ${id} not found`);
    }

    Object.assign(requestItemNotification, input);

    await this.requestItemNotificationRepository.save(requestItemNotification);
    return await this.findRequestItemNotificationById(id);
  }

  async deleteRequestItemNotification(id: string): Promise<RequestItemNotification | null> {
    const requestItemNotification = await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, requestItem: true },
      where: { id },
    });
    await this.requestItemNotificationRepository.delete(id);
    return requestItemNotification;
  }

  async softDeleteRequestItemNotification(id: string): Promise<RequestItemNotification | null> {
    const requestItemNotification = await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, requestItem: true },
      where: { id },
    });
    await this.requestItemNotificationRepository.softDelete(id);
    return requestItemNotification;
  }

    // Store Item Notifications

    async findAllStoreItemNotifications(skip: number, take: number): Promise<StoreItemNotification[]> {
      const data = await this.storeItemNotificationRepository.find({
        skip,
        take,
        relations: { recievers: true, storeItem: true },
      });
      return data;
    }
  
    async findStoreItemNotificationById(id: string): Promise<StoreItemNotification | null> {
      return await this.storeItemNotificationRepository.findOne({
        relations: { recievers: true, storeItem: true },
        where: { id },
      });
    }
  
    async createStoreItemNotification(input: Partial<StoreItemNotification>): Promise<StoreItemNotification | null> {
      const storeItemNotification = this.storeItemNotificationRepository.create(input);
      const createdStoreItemNotification = await this.storeItemNotificationRepository.save(storeItemNotification);
      return await this.storeItemNotificationRepository.findOne({
        relations: { recievers: true, storeItem: true },
        where: { id: createdStoreItemNotification.id },
      });
    }
  
    async updateStoreItemNotification(id: string, input: Partial<StoreItemNotification>): Promise<StoreItemNotification | null> {
      const storeItemNotification = await this.storeItemNotificationRepository.findOne({
        relations: { recievers: true, storeItem: true },
        where: { id },
      });
  
      // If the Store notification doesn't exist, throw NotFoundException
      if (!storeItemNotification) {
        throw new NotFoundException(`Store Item Notification with id ${id} not found`);
      }
  
      Object.assign(storeItemNotification, input);
  
      await this.storeItemNotificationRepository.save(storeItemNotification);
      return await this.findStoreItemNotificationById(id);
    }
  
    async deleteStoreItemNotification(id: string): Promise<StoreItemNotification | null> {
      const storeItemNotification = await this.storeItemNotificationRepository.findOne({
        relations: { recievers: true, storeItem: true },
        where: { id },
      });
      await this.storeItemNotificationRepository.delete(id);
      return storeItemNotification;
    }
  
    async softDeleteStoreItemNotification(id: string): Promise<StoreItemNotification | null> {
      const storeItemNotification = await this.storeItemNotificationRepository.findOne({
        relations: { recievers: true, storeItem: true },
        where: { id },
      });
      await this.storeItemNotificationRepository.softDelete(id);
      return storeItemNotification;
    }

  // Request Notifications

  async findAllRequestNotifications(skip: number, take: number): Promise<RequestNotification[]> {
    const data = await this.requestNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, request: true },
    });
    return data;
  }

  async findRequestNotificationById(id: string): Promise<RequestNotification | null> {
    return await this.requestNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
  }

  async createRequestNotification(input: Partial<RequestNotification>): Promise<RequestNotification | null> {
    const requestNotification = this.requestNotificationRepository.create(input);
    const createdRequestNotification = await this.requestNotificationRepository.save(requestNotification);
    return await this.requestNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id: createdRequestNotification.id },
    });
  }

  async updateRequestNotification(id: string, input: Partial<RequestNotification>): Promise<RequestNotification | null> {
    const requestNotification = await this.requestNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!requestNotification) {
      throw new NotFoundException(`Request Notification with id ${id} not found`);
    }

    Object.assign(requestNotification, input);

    await this.requestNotificationRepository.save(requestNotification);
    return await this.findRequestNotificationById(id);
  }

  async deleteRequestNotification(id: string): Promise<RequestNotification | null> {
    const requestNotification = await this.requestNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.requestNotificationRepository.delete(id);
    return requestNotification;
  }

  async softDeleteRequestNotification(id: string): Promise<RequestNotification | null> {
    const requestNotification = await this.requestNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.requestNotificationRepository.softDelete(id);
    return requestNotification;
  }

  // Property Notifications

  async findAllPropertyNotifications(skip: number, take: number): Promise<PropertyNotification[]> {
    const data = await this.propertyNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, property: true },
    });
    return data;
  }

  async findPropertyNotificationById(id: string): Promise<PropertyNotification | null> {
    return await this.propertyNotificationRepository.findOne({
      relations: { recievers: true, property: true },
      where: { id },
    });
  }

  async createPropertyNotification(input: Partial<PropertyNotification>): Promise<PropertyNotification | null> {
    const propertyNotification = this.propertyNotificationRepository.create(input);
    const createdPropertyNotification = await this.propertyNotificationRepository.save(propertyNotification);
    return await this.propertyNotificationRepository.findOne({
      relations: { recievers: true, property: true },
      where: { id: createdPropertyNotification.id },
    });
  }

  async updatePropertyNotification(id: string, input: Partial<PropertyNotification>): Promise<PropertyNotification | null> {
    const propertyNotification = await this.propertyNotificationRepository.findOne({
      relations: { recievers: true, property: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!propertyNotification) {
      throw new NotFoundException(`Property Notification with id ${id} not found`);
    }

    Object.assign(propertyNotification, input);

    await this.propertyNotificationRepository.save(propertyNotification);
    return await this.findPropertyNotificationById(id);
  }

  async deletePropertyNotification(id: string): Promise<PropertyNotification | null> {
    const propertyNotification = await this.propertyNotificationRepository.findOne({
      relations: { recievers: true, property: true },
      where: { id },
    });
    await this.propertyNotificationRepository.delete(id);
    return propertyNotification;
  }

  async softDeletePropertyNotification(id: string): Promise<PropertyNotification | null> {
    const propertyNotification = await this.propertyNotificationRepository.findOne({
      relations: { recievers: true, property: true },
      where: { id },
    });
    await this.propertyNotificationRepository.softDelete(id);
    return propertyNotification;
  }

  // Role Notifications

  // async findAllRoleNotifications(skip: number, take: number): Promise<RoleNotification[]> {
  //   const data = await this.roleNotificationRepository.find({
  //     skip,
  //     take,
  //     relations: { recievers: true, role: true },
  //   });
  //   return data;
  // }

  // async findRoleNotificationById(id: string): Promise<RoleNotification | null> {
  //   return await this.roleNotificationRepository.findOne({
  //     relations: { recievers: true, role: true },
  //     where: { id },
  //   });
  // }

  // async createRoleNotification(input: Partial<RoleNotification>): Promise<RoleNotification | null> {
  //   const roleNotification = this.roleNotificationRepository.create(input);
  //   const createdRoleNotification = await this.roleNotificationRepository.save(roleNotification);
  //   return await this.roleNotificationRepository.findOne({
  //     relations: { recievers: true, role: true },
  //     where: { id: createdRoleNotification.id },
  //   });
  // }

  // async updateRoleNotification(id: string, input: Partial<RoleNotification>): Promise<RoleNotification | null> {
  //   const roleNotification = await this.roleNotificationRepository.findOne({
  //     relations: { recievers: true, role: true },
  //     where: { id },
  //   });

  //   // If the request notification doesn't exist, throw NotFoundException
  //   if (!roleNotification) {
  //     throw new NotFoundException(`Role Notification with id ${id} not found`);
  //   }

  //   Object.assign(roleNotification, input);

  //   await this.roleNotificationRepository.save(roleNotification);
  //   return await this.findRoleNotificationById(id);
  // }

  // async deleteRoleNotification(id: string): Promise<RoleNotification | null> {
  //   const roleNotification = await this.roleNotificationRepository.findOne({
  //     relations: { recievers: true, role: true },
  //     where: { id },
  //   });
  //   await this.roleNotificationRepository.delete(id);
  //   return roleNotification;
  // }

  // async softDeleteRoleNotification(id: string): Promise<RoleNotification | null> {
  //   const roleNotification = await this.roleNotificationRepository.findOne({
  //     relations: { recievers: true, role: true },
  //     where: { id },
  //   });
  //   await this.roleNotificationRepository.softDelete(id);
  //   return roleNotification;
  // }

  // User Notifications

  // async findAllUserNotifications(skip: number, take: number): Promise<UserNotification[]> {
  //   const data = await this.userNotificationRepository.find({
  //     skip,
  //     take,
  //     relations: { recievers: true, user: true },
  //   });
  //   return data;
  // }

  // async findUserNotificationById(id: string): Promise<UserNotification | null> {
  //   return await this.userNotificationRepository.findOne({
  //     relations: { recievers: true, user: true },
  //     where: { id },
  //   });
  // }

  // async createUserNotification(input: Partial<UserNotification>): Promise<UserNotification | null> {
  //   const userNotification = this.userNotificationRepository.create(input);
  //   const createdUserNotification = await this.userNotificationRepository.save(userNotification);
  //   return await this.userNotificationRepository.findOne({
  //     relations: { recievers: true, user: true },
  //     where: { id: createdUserNotification.id },
  //   });
  // }

  // async updateUserNotification(id: string, input: Partial<UserNotification>): Promise<UserNotification | null> {
  //   const userNotification = await this.userNotificationRepository.findOne({
  //     relations: { recievers: true, user: true },
  //     where: { id },
  //   });

  //   // If the request notification doesn't exist, throw NotFoundException
  //   if (!userNotification) {
  //     throw new NotFoundException(`User Notification with id ${id} not found`);
  //   }

  //   Object.assign(userNotification, input);

  //   await this.userNotificationRepository.save(userNotification);
  //   return await this.findUserNotificationById(id);
  // }

  // async deleteUserNotification(id: string): Promise<UserNotification | null> {
  //   const userNotification = await this.userNotificationRepository.findOne({
  //     relations: { recievers: true, user: true },
  //     where: { id },
  //   });
  //   await this.userNotificationRepository.delete(id);
  //   return userNotification;
  // }

  // async softDeleteUserNotification(id: string): Promise<UserNotification | null> {
  //   const userNotification = await this.userNotificationRepository.findOne({
  //     relations: { recievers: true, user: true },
  //     where: { id },
  //   });
  //   await this.userNotificationRepository.softDelete(id);
  //   return userNotification;
  // }

  // Notification Recievers

  async findAllNotificationRecievers(skip: number, take: number): Promise<NotificationReciever[]> {
    const data = await this.notificationRecieverRepository.find({
      skip,
      take,
      relations: { notification: true },
    });
    return data;
  }

  async findNotificationRecieverById(id: string): Promise<NotificationReciever | null> {
    return await this.notificationRecieverRepository.findOne({
      relations: { notification: true },
      where: { id },
    });
  }

  async createNotificationReciever(input: Partial<NotificationReciever>): Promise<NotificationReciever | null> {
    const reciever = this.notificationRecieverRepository.create(input);
    const createdReciever = await this.notificationRecieverRepository.save(reciever);
    return await this.notificationRecieverRepository.findOne({
      relations: { notification: true },
      where: { id: createdReciever.id },
    });
  }

  async createNotificationReceivers(inputs: Partial<NotificationReciever>[]): Promise<NotificationReciever[] | null> {
    const receivers: NotificationReciever[] = [];

    for (const input of inputs) {
      const receiver = this.notificationRecieverRepository.create(input);
      const createdReceiver = await this.notificationRecieverRepository.save(receiver);

      const fetchedReceiver = await this.notificationRecieverRepository.findOne({
        relations: { notification: true },
        where: { id: createdReceiver.id },
      });

      if (fetchedReceiver) {
        receivers.push(fetchedReceiver);
      }
    }

    return receivers.length > 0 ? receivers : null;
  }

  async updateNotificationReciever(id: string, input: Partial<NotificationReciever>): Promise<NotificationReciever | null> {
    const reciever = await this.notificationRecieverRepository.findOne({
      relations: { notification: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!reciever) {
      throw new NotFoundException(`Notification Reciever with id ${id} not found`);
    }

    Object.assign(reciever, input);

    await this.notificationRecieverRepository.save(reciever);
    return await this.findNotificationRecieverById(id);
  }

  async deleteNotificationReciever(id: string): Promise<NotificationReciever | null> {
    const reciever = await this.notificationRecieverRepository.findOne({
      relations: { notification: true },
      where: { id },
    });
    await this.notificationRecieverRepository.delete(id);
    return reciever;
  }

  async softDeleteNotificationReciever(id: string): Promise<NotificationReciever | null> {
    const reciever = await this.notificationRecieverRepository.findOne({
      relations: { notification: true },
      where: { id },
    });
    await this.notificationRecieverRepository.softDelete(id);
    return reciever;
  }

}
