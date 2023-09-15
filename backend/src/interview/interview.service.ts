import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './interview.entity';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async createInterview(input: Partial<Interview>): Promise<Interview> {
    const interview = this.interviewRepository.create(input);
    return await this.interviewRepository.save(interview);
  }

  async findAllInterviews(): Promise<Interview[]> {
    return await this.interviewRepository.find();
  }

  async findInterviewById(id: string): Promise<Interview> {
    return await this.interviewRepository.findOne({where: {id}});
  }

  async updateInterview(id: string, input: Partial<Interview>): Promise<Interview> {
    await this.interviewRepository.update(id, input);
    return await this.interviewRepository.findOne({where: {id}});
  }

  async deleteInterview(id: string): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({where: {id}});
    await this.interviewRepository.delete(id);
    return interview;
  }
}
