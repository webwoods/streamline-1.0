import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interview.entity';
import { InterviewResolver } from './interview.resolver';
import { InterviewService } from './interview.service';

@Module({
  imports: [TypeOrmModule.forFeature([Interview])],
  providers: [InterviewService, InterviewResolver],
  exports: [InterviewService],
})
export class InterviewModule {}
