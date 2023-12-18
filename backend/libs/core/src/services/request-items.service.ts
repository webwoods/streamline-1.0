import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RequestItem } from '../entities/request-items.entity';

@Injectable()
export class RequestItemsService {
  constructor(
    @InjectRepository(RequestItem)
    private readonly requestItemRepository: Repository<RequestItem>,
  ) {}

  async findAllRequestItems(
    skip: number,
    take: number,
  ): Promise<RequestItem[]> {
    const data = await this.requestItemRepository.find({
      skip,
      take,
      relations: { requests: true, properties: true },
    });
    return data;
  }

  async searchRequestItems(searchString: string, skip: number, pageSize: number): Promise<RequestItem[]> {
    try {
      // Split the search string into an array of individual words
      const searchWords = searchString.split(' ');
  
      // Find request items that match the search words
      const requestItems = await this.requestItemRepository.find({
        where: searchWords.map((word) => ({ name: Like(`%${word}%`) })),
        skip,
        take: pageSize,
      });
  
      return requestItems;
    } catch (error) {
      throw new Error(`Error searching request items: ${error.message}`);
    }
  }

  async findRequestItemById(id: string): Promise<RequestItem | null> {
    return await this.requestItemRepository.findOne({
      relations: {
        requests: true,
        properties: true,
      },
      where: { id },
    });
  }

  async createRequestItem(
    input: Partial<RequestItem>,
  ): Promise<RequestItem | null> {
    const requestItem = this.requestItemRepository.create(input);
    const createdRequest = await this.requestItemRepository.save(requestItem);
    return await this.requestItemRepository.findOne({
      relations: { requests: true, properties: true },
      where: { id: createdRequest.id },
    });
  }

  async updateRequestItem(
    id: string,
    input: Partial<RequestItem>,
  ): Promise<RequestItem | null> {
    const requestItem = await this.requestItemRepository.findOne({
      relations: { requests: true, properties: true },
      where: { id },
    });

    // If the request item doesn't exist, throw NotFoundException
    if (!requestItem) {
      throw new NotFoundException(`Request Item with id ${id} not found`);
    }

    Object.assign(requestItem, input);

    await this.requestItemRepository.save(requestItem);
    return await this.findRequestItemById(id);
  }

  async deleteRequestItem(id: string): Promise<RequestItem | null> {
    const requestItem = await this.requestItemRepository.findOne({
      relations: { requests: true, properties: true },
      where: { id },
    });
    await this.requestItemRepository.delete(id);
    return requestItem;
  }
}
