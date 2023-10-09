import { Module } from '@nestjs/common';
import { PropertiesResolver } from './properties.resolver';

@Module({
  providers: [PropertiesResolver]
})
export class PropertiesModule {}
