import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async findAllRequests(skip?: number, take?: number): Promise<Request[]> {
    const data = await this.requestRepository.find({
      skip,
      take,
      relations: { file: true },
    });
    return data;
  }

  async findAllRequestsByUserId(
    userId: string,
    skip?: number,
    take?: number,
  ): Promise<Request[]> {
    const data = await this.requestRepository.find({
      skip,
      take,
      relations: { file: true },
      where: {
        requestedUserId: userId,
      },
    });
    return data;
  }

  async findRequestById(id: string): Promise<Request | null> {
    return await this.requestRepository.findOne({
      relations: {
        file: true,
      },
      where: { id },
    });
  }

  async createRequest(input: Partial<Request>): Promise<Request | null> {
    const request = this.requestRepository.create(input);
    const createdRequest = await this.requestRepository.save(request);
    return await this.requestRepository.findOne({
      relations: { file: true },
      where: { id: createdRequest.id },
    });
  }

  async updateRequest(
    id: string,
    input: Partial<Request>,
  ): Promise<Request | null> {
    const request = await this.requestRepository.findOne({
      relations: { file: true },
      where: { id },
    });

    // If the request doesn't exist, throw NotFoundException
    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    // Update the request object with the values from the input
    Object.assign(request, input);
    console.log(request);
    await this.requestRepository.save(request);
    return await this.findRequestById(id);
  }

  async deleteRequest(id: string): Promise<Request | null> {
    const request = await this.requestRepository.findOne({
      relations: { file: true },
      where: { id },
    });
    await this.requestRepository.delete(id);
    return request;
  }
}
