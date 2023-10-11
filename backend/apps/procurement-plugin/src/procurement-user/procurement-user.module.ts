import { Module } from '@nestjs/common';
import { ProcurementUserResolver } from './procurement-user.resolver';
import { ProcurementUserService } from './procurement-user.service';
import { UserModule } from '@libs/core/users/user.module';
import { ProcurementUser } from './procurement-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProcurementUser]), UserModule],
  providers: [ProcurementUserResolver, ProcurementUserService],
  exports: [ProcurementUserResolver, ProcurementUserService],
})
export class ProcurementUserModule {}
