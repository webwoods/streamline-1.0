import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async createRequest(input: Partial<Request>): Promise<Request> {
    const request = this.requestRepository.create(input);
    return await this.requestRepository.save(request);
  }

  async findAllRequests(): Promise<Request[]> {
    return await this.requestRepository.find();
  }

  async findRequestById(id: string): Promise<Request> {
    return await this.requestRepository.findOne({ where: { id } });
  }

  async findRequestsByFileType(requestType: string): Promise<Request[]> {
    return await this.requestRepository.find({ where: { requestType } });
  }

  async findRequestsByFileId(fileId: string): Promise<Request[]> {
    return await this.requestRepository.find({ where: { fileId } });
  }

  async updateRequest(id: string, input: Partial<Request>): Promise<Request> {
    await this.requestRepository.update(id, input);
    return await this.requestRepository.findOne({ where: { id } });
  }

  async deleteRequest(id: string): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id } });
    await this.requestRepository.delete(id);
    return request;
  }
}
