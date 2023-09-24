import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/roles/role.module';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => RoleModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
