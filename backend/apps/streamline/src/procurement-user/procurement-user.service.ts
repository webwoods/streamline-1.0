import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ProcurementUser } from './procurement-user.entity';

@Injectable()
export class ProcurementUserService {
  constructor(
    @InjectRepository(ProcurementUser)
    private readonly procurementUserRepository: Repository<ProcurementUser>,
  ) {}

  async createProcurementUser(input: Partial<ProcurementUser>): Promise<ProcurementUser> {
    const user = this.procurementUserRepository.create(input);
    return await this.procurementUserRepository.save(user);
  }

  async findAllProcurementUsers(): Promise<ProcurementUser[]> {
    return await this.procurementUserRepository.find();
  }

  async findProcurementUserById(id: string): Promise<ProcurementUser> {
    return await this.procurementUserRepository.findOne({ where: { id } });
  }

  async updateProcurementUser(id: string, input: Partial<ProcurementUser>): Promise<ProcurementUser> {
    await this.procurementUserRepository.update(id, input);
    return await this.procurementUserRepository.findOne({ where: { id } });
  }

  async deleteProcurementUser(id: string): Promise<ProcurementUser> {
    const request = await this.procurementUserRepository.findOne({ where: { id } });
    await this.procurementUserRepository.delete(id);
    return request;
  }
}
