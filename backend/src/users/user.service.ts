import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
      },
      where: { id },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
      },
      where: { username },
    });
  }

  async createUser(input: Partial<User>): Promise<User> {
    const user = this.userRepository.create(input);
    const createdUser = await this.userRepository.save(user);
    return await this.userRepository.findOne({
      relations: {
        role: true,
      },
      where: { id: createdUser.id },
    });
  }

  async updateUser(id: string, input: Partial<User>): Promise<User> {
    await this.userRepository.update(id, input);
    return await this.userRepository.findOne({
      relations: {
        role: true,
      },
      where: { id },
    });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: {
        role: true,
      },
      where: { id },
    });
    await this.userRepository.delete(id);
    return user;
  }
}
