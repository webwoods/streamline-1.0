import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: Partial<User>): Promise<User> {
    const user = this.userRepository.create(input);
    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findUsersByRoleId(roleId: string): Promise<User[]> {
    return await this.userRepository.find({ where: { roleId } });
  }

  async updateUser(id: string, input: Partial<User>): Promise<User> {
    await this.userRepository.update(id, input);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(id);
    return user;
  }
}
