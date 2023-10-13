import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module';
import { RequestItemsModule } from './request-items/request-items.module';
import { ProcurementUserModule } from './procurement-user/procurement-user.module';
import { FileModule } from './files/file.module';
import { RequestModule } from './requests/request.module';

@Module({
  imports: [
    AuthModule,
    ProcurementUserModule,
    FileModule,
    RequestItemsModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
