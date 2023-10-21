import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getDbConfig } from '@libs/core/config/orm.config';
import { MAIN_APP } from '@libs/core/constants/appInfo';
import { AuthModule } from '@libs/core/modules/auth.module';
import { UserModule } from '@libs/core/modules/user.module';
import { RoleModule } from '@libs/core/modules/role.module';
import { VerificationCodesModule } from '@libs/core/modules/verification-codes.module';
import { ProcurementUserModule } from '@libs/core/modules/procurement-user.module';
import { FileModule } from '@libs/core/modules/file.module';
import { RequestItemsModule } from '@libs/core/modules/request-items.module';
import { RequestModule } from '@libs/core/modules/request.module';
import { PropertiesModule } from '@libs/core/modules/property.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@libs/core/entities/user.entity';
import { VerificationCode } from '@libs/core/entities/verification-codes.entity';
import { Role } from '@libs/core/entities/role.entity';
import { RequestItem } from '@libs/core/entities/request-items.entity';
import { Property } from '@libs/core/entities/property.entity';
import { ProcurementUser } from '@libs/core/entities/procurement-user.entity';
import { File } from '@libs/core/entities/file.entity';
import { Request } from '@libs/core/entities/request.entity';

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
