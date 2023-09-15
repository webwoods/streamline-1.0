import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stall } from './stall.entity';

@Injectable()
export class StallService {
  constructor(
    @InjectRepository(Stall)
    private readonly stallRepository: Repository<Stall>,
  ) {}

  async createStall(input: Partial<Stall>): Promise<Stall> {
    const stall = this.stallRepository.create(input);
    return await this.stallRepository.save(stall);
  }

  async findAllStalls(): Promise<Stall[]> {
    return await this.stallRepository.find();
  }

  async findStallById(id: string): Promise<Stall> {
    return await this.stallRepository.findOne({ where: { id } });
  }

  async updateStall(id: string, input: Partial<Stall>): Promise<Stall> {
    await this.stallRepository.update(id, input);
    return await this.stallRepository.findOne({ where: { id } });
  }

  async deleteStall(id: string): Promise<Stall> {
    const stall = await this.stallRepository.findOne({ where: { id } });
    await this.stallRepository.delete(id);
    return stall;
  }
}
