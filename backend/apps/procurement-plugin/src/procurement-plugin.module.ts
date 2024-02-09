import { Module } from '@nestjs/common';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { User } from '@libs/core/entities/user.entity';
import { VerificationCode } from '@libs/core/entities/verification-codes.entity';
import { RequestItem } from '@libs/core/entities/request-items.entity';
import { Role } from '@libs/core/entities/role.entity';
import { Property } from '@libs/core/entities/property.entity';
import { File } from '@libs/core/entities/file.entity';
import { Request } from '@libs/core/entities/request.entity';
import { ProcurementModule } from '@libs/core/modules/procurement.module';
import * as dotenv from 'dotenv';
import { StoreItem } from '@libs/core/entities/store-item.entity';
import { Vendor } from '@libs/core/entities/vendor.entity';
import { Notification } from '@libs/core/entities/notification.entity';
import { NotificationReciever } from '@libs/core/entities/notification-reciever.entity';
import { RequestNotification } from '@libs/core/entities/request-notification.entity';
import { FileNotification } from '@libs/core/entities/file-notification.entity';
import { PropertyNotification } from '@libs/core/entities/property-notification.entity';
import { RequestItemNotification } from '@libs/core/entities/request-item-notification.entity';
import { RoleNotification } from '@libs/core/entities/role-notification.entity';
import { UserNotification } from '@libs/core/entities/user-notification.entity';
import { StoreItemNotification } from '@libs/core/entities/store-item-notification.entity';

dotenv.config();

@Module({
  imports: [
    ProcurementModule,

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(__dirname, '/procurement_schema.gql'),
    //   sortSchema: true,
    //   playground: true,
    //   include: [ProcurementModule],
    //   path: '/graphql',
    //   context: ({ req, res }) => ({ request: req, response: res }),
    // }),
    

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(__dirname, '/gateway/procurement-schema.gql'),
      sortSchema : true,
      include: [ProcurementModule],
      playground: true,
      path: 'gateway/'
    }),


    TypeOrmModule.forRoot({
      type: process.env.PRC_DB === 'postgres' ? 'postgres' : 'mysql',
      host: process.env.PRC_DB_HOST,
      port: Number(process.env.PRC_DB_PORT),
      username: process.env.PRC_DB_USERNAME,
      password: process.env.PRC_DB_PASSWORD,
      database: process.env.PRC_DB_NAME,
      entities: [
        User,
        Role,
        VerificationCode,
        Request,
        RequestItem,
        Property,
        File,
        StoreItem,
        Notification,
        NotificationReciever,
        RequestNotification,
        FileNotification,
        PropertyNotification, 
        RequestItemNotification,
        StoreItemNotification,
        // RoleNotification,
        // UserNotification
        Vendor,
      ],
      synchronize: true,
    }),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
  exports: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
