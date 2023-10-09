import { Module } from '@nestjs/common';
import { AccountsBranchPluginController } from './accounts-branch-plugin.controller';
import { AccountsBranchPluginService } from './accounts-branch-plugin.service';

@Module({
  imports: [],
  controllers: [AccountsBranchPluginController],
  providers: [AccountsBranchPluginService],
})
export class AccountsBranchPluginModule {}
