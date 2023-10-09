import { Global, Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { UserResolver } from './users/user.resolver';
import { RoleResolver } from './roles/role.resolver';

@Global()
@Module({
  providers: [CoreService, UserResolver, RoleResolver],
  exports: [CoreService, UserResolver, RoleResolver],
})
export class CoreModule {}
