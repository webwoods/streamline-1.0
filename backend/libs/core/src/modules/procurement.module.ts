import { Module } from '@nestjs/common';
import { ProcurementService } from '../services/procurement.service';
import { ProcurementResolver } from '../resolvers/procurement.resolver';
import { FileModule } from '../modules/file.module';
import { RequestItemsModule } from '../modules/request-items.module';
import { RequestModule } from '../modules/request.module';
import { PropertiesModule } from '../modules/property.module';
import { StoreItemModule } from './store-item.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    FileModule,
    RequestItemsModule,
    RequestModule,
    PropertiesModule,
    StoreItemModule,
    NotificationModule,
  ],
  exports: [ProcurementService],
  providers: [ProcurementService, ProcurementResolver],
})
export class ProcurementModule {}
