import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from '../entities/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
  ],
  providers: [],
  exports: [],
})
export class FeedbackModule {}
