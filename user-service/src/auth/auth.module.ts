import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../libs/core/src/constants/constants';
import { AuthResolver } from './auth.resolver';
import { VerificationCodesModule } from 'src/verification-codes/verification-codes.module';

@Module({
  imports: [
    UserModule,
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
