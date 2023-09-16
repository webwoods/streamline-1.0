import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestItem } from 'src/models/requestItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestItemService {
  constructor(
    @InjectRepository(RequestItem)
    private readonly requestItemRepository: Repository<RequestItem>,
  ) {}

  async createRequestItem(input: Partial<RequestItem>): Promise<RequestItem> {
    const requestItem = this.requestItemRepository.create(input);
    return await this.requestItemRepository.save(requestItem);
  }

  async findAllRequestItems(): Promise<RequestItem[]> {
    return await this.requestItemRepository.find();
  }

  async findRequestItemById(id: string): Promise<RequestItem> {
    return await this.requestItemRepository.findOne({ where: { id } });
  }

  async updateRequestItem(id: string, input: Partial<RequestItem>): Promise<RequestItem> {
    await this.requestItemRepository.update(id, input);
    return await this.requestItemRepository.findOne({ where: { id } });
  }

  async deleteRequestItem(id: string): Promise<RequestItem> {
    const requestItem = await this.requestItemRepository.findOne({ where: { id } });
    await this.requestItemRepository.delete(id);
    return requestItem;
  }
}
