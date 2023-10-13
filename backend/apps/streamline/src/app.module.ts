import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RequestItemsModule } from './request-items/request-items.module';
import { ProcurementUserModule } from './procurement-user/procurement-user.module';
import { FileModule } from './files/file.module';
import { RequestModule } from './requests/request.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getDbConfig } from '@libs/core/config/orm.config';
import { MAIN_APP } from '@libs/core/constants/appInfo';
import { Role } from '@libs/core/roles/role.entity';
import { User } from '@libs/core/users/user.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PropertiesModule } from './properties/property.module';
import { Request } from './requests/request.entity';
import { RequestItem } from './request-items/request-items.entity';
import { Property } from './properties/property.entity';
import { File } from './files/file.entity';
import { ProcurementUser } from './procurement-user/procurement-user.entity';

@Module({
  imports: [
    AuthModule,
    ProcurementUserModule,
    FileModule,
    RequestItemsModule,
    RequestModule,
    PropertiesModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), MAIN_APP.schema),
      sortSchema: true,
      playground: true,
      path: MAIN_APP.graphqlEndpoint,
    }),

    TypeOrmModule.forRoot(
      getDbConfig({
        db: { type: 'postgres' },
        entities: [
          User,
          Role,
          VerificationCode,
          Request,
          RequestItem,
          Property,
          File,
          ProcurementUser,
        ],
      }),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
