import { Injectable } from '@nestjs/common';
import { VerificationCode } from '../entities/verification-codes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationCodesService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
  ) {}

  async createVerificationCode(input: Partial<VerificationCode>): Promise<any> {
    try {
      const verificationCode = this.verificationCodeRepository.create(input);
      await this.verificationCodeRepository.save(verificationCode);
      return 'verification code saved succesfully';
    } catch (error) {
      throw new Error(`Error creating verification code: ${error}`);
    }
  }

  async findAllVerificationCodes(): Promise<VerificationCode[]> {
    return await this.verificationCodeRepository.find({
      relations: { user: true },
      order: {
        updatedAt: 'DESC'
      }
    });
  }

  async findVerificationCodesByUserId(userId: string): Promise<VerificationCode[]> {
    try {
      return await this.verificationCodeRepository.find({
        relations: { user: true },
        where: { userId },
        order: {
          updatedAt: 'DESC'
        }
      });
    } catch (error) {
      throw new Error(`Error fetching verification code: ${error}`);
    }
  }

  async updateVerificationCode(
    id: string,
    input: Partial<VerificationCode>,
  ): Promise<any> {
    try {
      await this.verificationCodeRepository.update(id, input);
      return 'verification code saved succesfully';
    } catch (error) {
      throw new Error(`Error updating verification code: ${error}`);
    }
  }

  async deleteVerificationCode(id: string): Promise<any> {
    try {
      await this.verificationCodeRepository.delete(id);
      return 'verification code deleted succesfully';;
    } catch (error) {
      throw new Error(`Error deleting verification code: ${error}`);
    }
  }
}
