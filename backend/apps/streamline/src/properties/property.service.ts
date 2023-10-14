import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async findAllPropertys(skip: number, take: number): Promise<Property[]> {
    const data = await this.propertyRepository.find({
      skip,
      take,
      relations: { requestItems: true },
    });
    return data;
  }

  async findPropertyById(id: string): Promise<Property | null> {
    return await this.propertyRepository.findOne({
      relations: { requestItems: true },
      where: { id },
    });
  }

  async createProperty(input: Partial<Property>): Promise<Property | null> {
    const property = this.propertyRepository.create(input);
    const createdProperty = await this.propertyRepository.save(property);
    return await this.propertyRepository.findOne({
      relations: { requestItems: true },
      where: { id: createdProperty.id },
    });
  }

  async updateProperty(id: string, input: Partial<Property>): Promise<Property | null> {
    const property = await this.propertyRepository.findOne({
      relations: { requestItems: true },
      where: { id },
    });

    // If the property doesn't exist, throw NotFoundException
    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }

    await this.propertyRepository.save(property);
    return await this.findPropertyById(id);
  }

  async deleteProperty(id: string): Promise<Property | null> {
    const property = await this.propertyRepository.findOne({
      relations: { requestItems: true },
      where: { id },
    });
    await this.propertyRepository.delete(id);
    return property;
  }
}
