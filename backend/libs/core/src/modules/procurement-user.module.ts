import { Module } from '@nestjs/common';
import { ProcurementUserResolver } from '../resolvers/procurement-user.resolver';
import { ProcurementUserService } from '../services/procurement-user.service';
import { UserModule } from '@libs/core/modules/user.module';
import { ProcurementUser } from '../entities/procurement-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProcurementUser]), UserModule],
  providers: [ProcurementUserResolver, ProcurementUserService],
  exports: [ProcurementUserResolver, ProcurementUserService],
})
export class ProcurementUserModule {}
