import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '@libs/core/users/user.module';
import { VerificationCodesModule } from '@libs/core/verification-codes/verification-codes.module';
import { jwtConstants } from '@libs/core/constants/constants';
import { RoleModule } from '../roles/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    VerificationCodesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
