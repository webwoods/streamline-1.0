import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers(skip: number, take: number): Promise<[User[], number]> {
    const [data, total] = await this.userRepository.findAndCount({
      skip,
      take,
      relations: {
        role: true,
        verificationCodes: true,
      },
    });
    return [data, total];
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { id },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
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
        verificationCodes: true,
      },
      where: { id: createdUser.id },
    });
  }

  async updateUser(id: string, input: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: { role: true, verificationCodes: true },
      where: { id },
    });

     // If the user doesn't exist, throw NotFoundException
     if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Construct the set object dynamically based on input values
    user.verified = true;
    await this.userRepository.save(user);
    return await this.findUserById(id);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { id },
    });
    await this.userRepository.delete(id);
    return user;
  }
}
