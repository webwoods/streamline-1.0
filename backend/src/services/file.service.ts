import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/models/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async createFile(input: Partial<File>): Promise<File> {
    const file = this.fileRepository.create(input);
    return await this.fileRepository.save(file);
  }

  async findAllFiles(): Promise<File[]> {
    return await this.fileRepository.find();
  }

  async findFileById(id: string): Promise<File> {
    return await this.fileRepository.findOne({ where: { id } });
  }

  async findFileByFilename(filename: string): Promise<File> {
    return await this.fileRepository.findOne({ where: { name: filename } });
  }

  async updateFile(id: string, input: Partial<File>): Promise<File> {
    await this.fileRepository.update(id, input);
    return await this.fileRepository.findOne({ where: { id } });
  }

  async deleteFile(id: string): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { id } });
    await this.fileRepository.delete(id);
    return file;
  }
}
