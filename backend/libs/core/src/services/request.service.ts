import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { apolloClient } from '../apollo/client';
import { RequestType } from '../entities/enum/requestType';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) { }

  async findAllRequests(skip?: number, take?: number, requestType?: RequestType): Promise<{ data: Request[]; count: number }> {
    const [data, count] = await this.requestRepository.findAndCount({
      skip,
      take,
      relations: { file: true, requestItems: { storeItem: true } },
      where: {
        requestType: requestType
      }
    });
    return { data, count };
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
