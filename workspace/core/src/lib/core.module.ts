import { Module } from '@nestjs/common';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';
import { VerificationCodesModule } from './verification-codes/verification-codes.module';

@Module({
  imports: [RoleModule, UserModule, VerificationCodesModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
