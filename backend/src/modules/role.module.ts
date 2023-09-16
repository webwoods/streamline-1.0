import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/models/role.entity';
import { RoleResolver } from 'src/resolvers/role.resolver';
import { RoleService } from 'src/services/role.service';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => UserModule)],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
