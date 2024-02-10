import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { StoreItem } from '../entities/store-item.entity';

@Injectable()
export class StoreItemsService {
  constructor(
    @InjectRepository(StoreItem)
    private readonly storeItemRepository: Repository<StoreItem>,
  ) { }

  async findAllStoreItems(
    skip: number,
    take: number,
  ): Promise<StoreItem[]> {
    const data = await this.storeItemRepository.find({
      skip,
      take,
      relations: { properties: true, requestItem: true },
    });
    return data;
  }

  async searchStoreItems(searchString: string, skip: number, pageSize: number): Promise<StoreItem[]> {
    try {
      // Split the search string into an array of individual words
      const searchWords = searchString.split(' ');

      // Find request items that match the search words
      const storeItems = await this.storeItemRepository.find({
        where: searchWords.map((word) => ({ name: ILike(`%${word}%`) })),
        skip,
        take: pageSize,
      });

      return storeItems;
    } catch (error) {
      throw new Error(`Error searching store items: ${error.message}`);
    }
  }

  async findStoreItemById(id: string): Promise<StoreItem | null> {
    return await this.storeItemRepository.findOne({
      relations: {
        properties: true, requestItem: true
      },
      where: { id },
    });
  }

  async createStoreItem(
    input: Partial<StoreItem>,
  ): Promise<StoreItem | null> {
    const StoreItem = this.storeItemRepository.create(input);
    const createdStoreItem = await this.storeItemRepository.save(StoreItem);
    return await this.storeItemRepository.findOne({
      relations: { properties: true, requestItem: true },
      where: { id: createdStoreItem.id },
    });
  }

  async createStoreItems(
    inputs: Partial<StoreItem>[]
  ): Promise<StoreItem[]> {
    try {
      const storeItems = inputs.map((input) => this.storeItemRepository.create(input));

      const createdStoreItems = await this.storeItemRepository.save(storeItems);

      return await this.storeItemRepository.find({
        where: createdStoreItems.map((item) => ({ id: item.id })),
        relations: { properties: true, requestItem: true },
      });

    } catch (error) {
      throw new Error(`Error creating store items: ${error.message}`);
    }
  }


  async updateStoreItem(
    id: string,
    input: Partial<StoreItem>,
  ): Promise<StoreItem | null> {
    const StoreItem = await this.storeItemRepository.findOne({
      relations: { properties: true, requestItem: true },
      where: { id },
    });

    // If the store item doesn't exist, throw NotFoundException
    if (!StoreItem) {
      throw new NotFoundException(`Store Item with id ${id} not found`);
    }

    Object.assign(StoreItem, input);

    await this.storeItemRepository.save(StoreItem);
    return await this.findStoreItemById(id);
  }

  async deleteStoreItem(id: string): Promise<StoreItem | null> {
    const StoreItem = await this.storeItemRepository.findOne({
      relations: { properties: true, requestItem: true },
      where: { id },
    });
    await this.storeItemRepository.delete(id);
    return StoreItem;
  }
}
