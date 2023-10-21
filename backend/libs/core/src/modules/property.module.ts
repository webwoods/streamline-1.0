import { Module } from '@nestjs/common';
import { PropertyResolver } from '../resolvers/property.resolver';
import { PropertyService } from '../services/property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertyResolver, PropertyService],
  exports: [PropertyResolver, PropertyService],
})
export class PropertiesModule {}
