import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getDbConfig } from '@libs/core/config/orm.config';
import { MAIN_APP } from '@libs/core/constants/appInfo';
import { Role } from '@libs/core/roles/role.entity';
import { User } from '@libs/core/users/user.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from '@libs/core/users/user.module';
import { AuthModule } from '@libs/core/auth/auth.module';
import { ProcurementUserModule } from '@libs/core/procurement-user/procurement-user.module';
import { FileModule } from '@libs/core/files/file.module';
import { RequestItemsModule } from '@libs/core/request-items/request-items.module';
import { RequestModule } from '@libs/core/requests/request.module';
import { PropertiesModule } from '@libs/core/properties/property.module';
import { Request } from '@libs/core/requests/request.entity';
import { RequestItem } from '@libs/core/request-items/request-items.entity';
import { Property } from '@libs/core/properties/property.entity';
import { File } from '@libs/core/files/file.entity';
import { ProcurementUser } from '@libs/core/procurement-user/procurement-user.entity';
import { RoleModule } from '@libs/core/roles/role.module';
import { VerificationCodesModule } from '@libs/core/verification-codes/verification-codes.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    VerificationCodesModule,
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
