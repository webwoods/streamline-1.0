import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthResolver } from './auth.resolver';
import { VerificationCodesModule } from 'src/verification-codes/verification-codes.module';

@Module({
  imports: [
    UserModule,
    VerificationCodesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,

        // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // },
  ],
  exports: [AuthService],
})
export class AuthModule {}
