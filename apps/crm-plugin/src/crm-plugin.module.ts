import { Module } from '@nestjs/common';
import { CrmPluginController } from './crm-plugin.controller';
import { CrmPluginService } from './crm-plugin.service';

@Module({
  imports: [],
  controllers: [CrmPluginController],
  providers: [CrmPluginService],
})
export class CrmPluginModule {}
