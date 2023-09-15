import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stall } from './stall.entity';
import { StallResolver } from './stall.resolver';
import { StallService } from './stall.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stall])],
  providers: [StallResolver, StallService],
  exports: [StallService],
})
export class StallModule {}