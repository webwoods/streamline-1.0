import { Controller, Get } from '@nestjs/common';
import { AuthPluginService } from './auth-plugin.service';

@Controller()
export class AuthPluginController {
  constructor(private readonly authPluginService: AuthPluginService) {}

  @Get()
  getHello(): string {
    return this.authPluginService.getHello();
  }
}
