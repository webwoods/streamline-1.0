import { Controller, Get } from '@nestjs/common';
import { UserPluginService } from './user-plugin.service';

@Controller()
export class UserPluginController {
  constructor(private readonly userPluginService: UserPluginService) {}

  @Get()
  getHello(): string {
    return this.userPluginService.getHello();
  }
}
