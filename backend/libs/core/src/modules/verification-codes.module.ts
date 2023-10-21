import { Module } from '@nestjs/common';
import { VerificationCodesService } from '../services/verification-codes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from '../entities/verification-codes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationCode])],
  providers: [VerificationCodesService],
  exports: [VerificationCodesService],
})
export class VerificationCodesModule {}
