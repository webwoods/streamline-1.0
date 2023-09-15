import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { UserModule } from 'src/user/user.module';
import { StallModule } from 'src/stall/stall.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UserModule, StallModule],
  providers: [CompanyService, CompanyResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
