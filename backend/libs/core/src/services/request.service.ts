import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Not, Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { apolloClient } from '../apollo/client';
import { RequestType } from '../entities/enum/requestType';
import { RequestStatus } from '../entities/enum/requestStatus';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) { }

  async findAllRequests(skip?: number, take?: number, requestType?: RequestType, status?: RequestStatus, updatedAt?: Date): Promise<{ data: Request[]; count: number }> {
    const whereClause: Record<string, any> = {};

    if (requestType) {
      whereClause.requestType = requestType;
    }
  
    if (status) {
      whereClause.status = status;
    }
  
    if (updatedAt) {
      // Adjust the updatedAt date to cover the entire day
      const startOfDay = new Date(updatedAt.setHours(0, 0, 0, 0));
      const endOfDay = new Date(updatedAt.setHours(23, 59, 59, 999));
  
      whereClause.updatedAt = Between(startOfDay, endOfDay);
    }
    
    const [data, count] = await this.requestRepository.findAndCount({
      skip,
      take,
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: whereClause
    });

    return { data, count };
  }

  async countAllRequests(skip?: number, take?: number, requestType?: RequestType, status?: RequestStatus, updatedAt?: Date): Promise<number> {
    const whereClause: Record<string, any> = {};

    if (requestType) {
      whereClause.requestType = requestType;
    }
  
    if (status) {
      whereClause.status = status;
    }
  
    if (updatedAt) {
      // Adjust the updatedAt date to cover the entire day
      const startOfDay = new Date(updatedAt.setHours(0, 0, 0, 0));
      const endOfDay = new Date(updatedAt.setHours(23, 59, 59, 999));
  
      whereClause.updatedAt = Between(startOfDay, endOfDay);
    }
    
    const count = await this.requestRepository.count({
      skip,
      take,
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: whereClause
    });

    return count;
  }

  async findAllSoftDeletedRequests(skip?: number, take?: number): Promise<{ data: Request[]; count: number }> {
    const [data, count] = await this.requestRepository.findAndCount({
      skip,
      take,
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      withDeleted: true,
      where: {
        deletedAt: Not(IsNull())
      }
    });
    return { data, count };
  }

  async findAllRequestsByUserId(
    userId: string,
    skip?: number,
    take?: number,
  ): Promise<Request[]> {
    const data = await this.requestRepository.find({
      skip,
      take,
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: {
        requestedUserId: userId,
      },
    });
    return data;
  }

  async findRequestById(id: string): Promise<Request | null> {
    return await this.requestRepository.findOne({
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: { id },
    });
  }

  async createRequest(input: Partial<Request>): Promise<Request | null> {
    const request = this.requestRepository.create(input);
    const createdRequest = await this.requestRepository.save(request);
    return await this.requestRepository.findOne({
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: { id: createdRequest.id },
    });
  }

  async updateRequest(
    id: string,
    input: Partial<Request>,
  ): Promise<Request | null> {
    const request = await this.requestRepository.findOne({
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: { id },
    });

    // If the request doesn't exist, throw NotFoundException
    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    // Update the request object with the values from the input
    Object.assign(request, input);

    await this.requestRepository.save(request);
    return await this.findRequestById(id);
  }

  async deleteRequest(id: string): Promise<Request | null> {
    const request = await this.requestRepository.findOne({
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: { id },
    });
    await this.requestRepository.delete(id);
    return request;
  }

  async softDeleteRequest(id: string): Promise<Request | null> {
    const request = await this.requestRepository.findOne({
      relations: { file: true, requestItems: { storeItem: true }, notifications: true, invoices: true, vendor: true },
      where: { id },
    });
    await this.requestRepository.softDelete(id);
    return request;
  }
}
