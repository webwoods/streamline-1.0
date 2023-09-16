import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/models/role.entity';
import { RoleResolver } from 'src/resolvers/role.resolver';
import { RoleService } from 'src/services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
