import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findFileById(id: string): Promise<File> {
    return await this.fileRepository.findOne({ where: { id } });
  }
  async findAllFiles(): Promise<File[]> {
    return await this.fileRepository.find();
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
