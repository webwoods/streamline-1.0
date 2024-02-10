import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../entities/vendor.entity';
import { VendorResolver } from '../resolvers/vendor.resolver';
import { VendorService } from '../services/vendor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
  ],
  providers: [VendorResolver, VendorService],
  exports: [VendorService],
})
export class VendorModule {}
