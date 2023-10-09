import { Controller, Get } from '@nestjs/common';
import { CrmPluginService } from './crm-plugin.service';

@Controller()
export class CrmPluginController {
  constructor(private readonly crmPluginService: CrmPluginService) {}

  @Get()
  getHello(): string {
    return this.crmPluginService.getHello();
  }
}
