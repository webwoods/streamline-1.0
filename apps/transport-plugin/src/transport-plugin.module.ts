import { Module } from '@nestjs/common';
import { TransportPluginController } from './transport-plugin.controller';
import { TransportPluginService } from './transport-plugin.service';

@Module({
  imports: [],
  controllers: [TransportPluginController],
  providers: [TransportPluginService],
})
export class TransportPluginModule {}
