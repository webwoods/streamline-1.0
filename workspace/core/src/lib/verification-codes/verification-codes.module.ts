import { Module, forwardRef } from '@nestjs/common';
import { VerificationCodesService } from './verification-codes.service';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from './verification-codes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationCode])],
  providers: [VerificationCodesService],
  exports: [VerificationCodesService]
})
export class VerificationCodesModule {}
