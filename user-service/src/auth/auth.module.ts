import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { jwtConstants } from '@webwoods/streamline/dist/constants/constants';
import { VerificationCodesModule } from '@webwoods/streamline/dist/verification-codes/verification-codes.module';
import { UserModule } from '@webwoods/streamline/dist/users/user.module';

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
