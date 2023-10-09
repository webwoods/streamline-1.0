import { Controller, Get } from '@nestjs/common';
import { AccountsBranchPluginService } from './accounts-branch-plugin.service';

@Controller()
export class AccountsBranchPluginController {
  constructor(private readonly accountsBranchPluginService: AccountsBranchPluginService) {}

  @Get()
  getHello(): string {
    return this.accountsBranchPluginService.getHello();
  }
}
