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

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(RequestNotification)
    private readonly requestNotificationRepository: Repository<RequestNotification>,
    @InjectRepository(NotificationReciever)
    private readonly notificationRecieverRepository: Repository<NotificationReciever>,

    @InjectRepository(RequestItemNotification)
    private readonly requestItemNotificationRepository: Repository<RequestItemNotification>,

    @InjectRepository(FileNotification)
    private readonly fileNotificationRepository: Repository<FileNotification>,

    @InjectRepository(UserNotification)
    private readonly userNotificationRepository: Repository<UserNotification>,

    @InjectRepository(RoleNotification)
    private readonly roleNotificationRepository: Repository<RoleNotification>,

  ) { }



// user

async createRoleNotificationWithReceivers(
  roleId: string,
  senderId: string,
  message: string,
  sendTo?: string[],
): Promise<RoleNotification | null> {
  try {
    const notification = await this.createRoleNotification({
      roleId: roleId,
      message: message,
      senderId: senderId,
    });


    const receivers = [senderId].map((receiverId) => ({
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

























// user

async createUserNotificationWithReceivers(
  userId: string,
  senderId: string,
  message: string,
  sendTo?: string[],
): Promise<UserNotification | null> {
  try {
    const notification = await this.createUserNotification({
      userId: userId,
      message: message,
      senderId: senderId,
    });


    const receivers = [senderId].map((receiverId) => ({
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



















// file

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


    const receivers = [senderId].map((receiverId) => ({
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












// request item 

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


    const receivers = [senderId].map((receiverId) => ({
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









//

async createRequestNotificationWithReceivers(
  requestId: string,
  senderId: string,
  message: string,
  sendTo?: string[],
): Promise<RequestNotification | null> {
  try {
    const notification = await this.createRequestNotification({
      requestItemId: requestId,
      message: message,
      senderId: senderId,
    });


    const receivers = [senderId].map((receiverId) => ({
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



















  // roles Notifications

  async findAllRoleNotifications(skip: number, take: number): Promise<RoleNotification[]> {
    const data = await this.roleNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, request: true },
    });
    return data;
  }

  async findRoleNotificationById(id: string): Promise<RoleNotification | null> {
    return await this.roleNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
  }

  async createRoleNotification(input: Partial<RoleNotification>): Promise<RoleNotification | null> {
    const requestNotification = this.roleNotificationRepository.create(input);
    const createdRequestNotification = await this.roleNotificationRepository.save(requestNotification);
    return await this.roleNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id: createdRequestNotification.id },
    });
  }

  async updateRoleNotification(id: string, input: Partial<RoleNotification>): Promise<RoleNotification | null> {
    const requestItemNotification = await this.roleNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!requestItemNotification) {
      throw new NotFoundException(`Request Notification with id ${id} not found`);
    }

    Object.assign(requestItemNotification, input);

    await this.roleNotificationRepository.save(requestItemNotification);
    return await this.findRoleNotificationById(id);
  }

  async deleteRoleNotification(id: string): Promise<RoleNotification | null> {
    const requestNotification = await this.roleNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.roleNotificationRepository.delete(id);
    return requestNotification;
  }

  async softDeleteRoleNotification(id: string): Promise<RoleNotification | null> {
    const requestNotification = await this.roleNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.roleNotificationRepository.softDelete(id);
    return requestNotification;
  }


























  // Request user Notifications

  async findAllUserNotifications(skip: number, take: number): Promise<UserNotification[]> {
    const data = await this.userNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, request: true },
    });
    return data;
  }

  async findUserNotificationById(id: string): Promise<UserNotification | null> {
    return await this.userNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
  }

  async createUserNotification(input: Partial<UserNotification>): Promise<UserNotification | null> {
    const requestNotification = this.userNotificationRepository.create(input);
    const createdRequestNotification = await this.userNotificationRepository.save(requestNotification);
    return await this.userNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id: createdRequestNotification.id },
    });
  }

  async updateUserNotification(id: string, input: Partial<UserNotification>): Promise<UserNotification | null> {
    const requestItemNotification = await this.userNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!requestItemNotification) {
      throw new NotFoundException(`Request Notification with id ${id} not found`);
    }

    Object.assign(requestItemNotification, input);

    await this.userNotificationRepository.save(requestItemNotification);
    return await this.findUserNotificationById(id);
  }

  async deleteUserNotification(id: string): Promise<UserNotification | null> {
    const requestNotification = await this.userNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.userNotificationRepository.delete(id);
    return requestNotification;
  }

  async softDeleteUserNotification(id: string): Promise<UserNotification | null> {
    const requestNotification = await this.userNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.userNotificationRepository.softDelete(id);
    return requestNotification;
  }















  // file Notifications

  async findAllFileNotifications(skip: number, take: number): Promise<FileNotification[]> {
    const data = await this.fileNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, request: true },
    });
    return data;
  }

  async findFileNotificationById(id: string): Promise<FileNotification | null> {
    return await this.fileNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
  }

  async createFileNotification(input: Partial<FileNotification>): Promise<FileNotification | null> {
    const requestNotification = this.fileNotificationRepository.create(input);
    const createdRequestNotification = await this.fileNotificationRepository.save(requestNotification);
    return await this.fileNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id: createdRequestNotification.id },
    });
  }

  async updateFileNotification(id: string, input: Partial<FileNotification>): Promise<FileNotification | null> {
    const requestItemNotification = await this.fileNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!requestItemNotification) {
      throw new NotFoundException(`Request Notification with id ${id} not found`);
    }

    Object.assign(requestItemNotification, input);

    await this.fileNotificationRepository.save(requestItemNotification);
    return await this.findFileNotificationById(id);
  }

  async deleteFileNotification(id: string): Promise<FileNotification | null> {
    const requestNotification = await this.fileNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.fileNotificationRepository.delete(id);
    return requestNotification;
  }

  async softDeleteFileNotification(id: string): Promise<FileNotification | null> {
    const requestNotification = await this.fileNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.fileNotificationRepository.softDelete(id);
    return requestNotification;
  }










  // Request Item Notifications

  async findAllRequestItemNotifications(skip: number, take: number): Promise<RequestItemNotification[]> {
    const data = await this.requestItemNotificationRepository.find({
      skip,
      take,
      relations: { recievers: true, request: true },
    });
    return data;
  }

  async findRequestItemNotificationById(id: string): Promise<RequestItemNotification | null> {
    return await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
  }

  async createRequestItemNotification(input: Partial<RequestNotification>): Promise<RequestItemNotification | null> {
    const requestNotification = this.requestItemNotificationRepository.create(input);
    const createdRequestNotification = await this.requestItemNotificationRepository.save(requestNotification);
    return await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id: createdRequestNotification.id },
    });
  }

  async updateRequestItemNotification(id: string, input: Partial<RequestItemNotification>): Promise<RequestItemNotification | null> {
    const requestItemNotification = await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });

    // If the request notification doesn't exist, throw NotFoundException
    if (!requestItemNotification) {
      throw new NotFoundException(`Request Notification with id ${id} not found`);
    }

    Object.assign(requestItemNotification, input);

    await this.requestItemNotificationRepository.save(requestItemNotification);
    return await this.findRequestItemNotificationById(id);
  }

  async deleteRequestItemNotification(id: string): Promise<RequestItemNotification | null> {
    const requestNotification = await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.requestItemNotificationRepository.delete(id);
    return requestNotification;
  }

  async softDeleteRequestItemNotification(id: string): Promise<RequestItemNotification | null> {
    const requestNotification = await this.requestItemNotificationRepository.findOne({
      relations: { recievers: true, request: true },
      where: { id },
    });
    await this.requestItemNotificationRepository.softDelete(id);
    return requestNotification;
  }







  

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
















}
