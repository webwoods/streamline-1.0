import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findAllFiles(skip: number, take: number): Promise<File[]> {
    const data = await this.fileRepository.find({
      skip,
      take,
      relations: { requests: true },
    });
    return data;
  }

  async findFileById(id: string): Promise<File | null> {
    return await this.fileRepository.findOne({
      relations: { requests: true },
      where: { id },
    });
  }

  async createFile(input: Partial<File>): Promise<File | null> {
    const file = this.fileRepository.create(input);
    const createdUser = await this.fileRepository.save(file);
    return await this.fileRepository.findOne({
      relations: { requests: true },
      where: { id: createdUser.id },
    });
  }

  async updateFile(id: string, input: Partial<File>): Promise<File | null> {
    const file = await this.fileRepository.findOne({
      relations: { requests: true },
      where: { id },
    });

    // If the file doesn't exist, throw NotFoundException
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    await this.fileRepository.save(file);
    return await this.findFileById(id);
  }

  async deleteFile(id: string): Promise<File | null> {
    const file = await this.fileRepository.findOne({
      relations: { requests: true },
      where: { id },
    });
    await this.fileRepository.delete(id);
    return file;
  }
}
