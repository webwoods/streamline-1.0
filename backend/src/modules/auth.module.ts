import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
