import { Controller, Get } from '@nestjs/common';
import { ProcurementPluginService } from './procurement-plugin.service';

@Controller()
export class ProcurementPluginController {
  constructor(private readonly procurementPluginService: ProcurementPluginService) {}

  @Get()
  getHello(): string {
    return this.procurementPluginService.getHello();
  }
}
