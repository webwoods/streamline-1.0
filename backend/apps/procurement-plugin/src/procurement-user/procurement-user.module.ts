import { Module } from '@nestjs/common';
import { ProcurementUserResolver } from './procurement-user.resolver';
import { ProcurementUserService } from './procurement-user.service';

@Module({
  providers: [ProcurementUserResolver, ProcurementUserService],
  exports: [ProcurementUserResolver, ProcurementUserService],
})
export class ProcurementUserModule {}
