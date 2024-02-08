import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { RequestNotification } from '../entities/request-notification.entity';
import { NotificationReciever } from '../entities/notification-reciever.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(RequestNotification)
    private readonly requestNotificationRepository: Repository<RequestNotification>,
    @InjectRepository(NotificationReciever)
    private readonly notificationRecieverRepository: Repository<NotificationReciever>
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

  async createRequestNotificationWithReceivers(
    requestId: string,
    senderId: string,
    message: string,
    sendTo?: string[],
  ): Promise<RequestNotification| null> {
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
