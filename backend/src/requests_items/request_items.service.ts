import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'src/requests/request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestItemsService {
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

  async findRequestsByFileId(fileId: string): Promise<Request[]> {
    return await this.requestRepository.find({ where: { fileId } });
  }

  async findRequestsByFileType(requestType: string): Promise<Request[]> {
    return await this.requestRepository.find({ where: { requestType } });
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
