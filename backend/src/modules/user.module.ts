import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from '../services/user.service';
import { RoleModule } from './role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
