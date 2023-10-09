import { Controller, Get } from '@nestjs/common';
import { TransportPluginService } from './transport-plugin.service';

@Controller()
export class TransportPluginController {
  constructor(private readonly transportPluginService: TransportPluginService) {}

  @Get()
  getHello(): string {
    return this.transportPluginService.getHello();
  }
}
