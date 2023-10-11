import { Module } from '@nestjs/common';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RequestModule } from './requests/request.module';
import { FileModule } from './files/file.module';
import { Request } from './requests/request.entity';
import { Role } from '@libs/core/roles/role.entity';
import { RoleModule } from '@libs/core/roles/role.module';
import { File } from './files/file.entity';
import { UserModule } from '@libs/core/users/user.module';
import { ProcurementUserModule } from './procurement-user/procurement-user.module';
import { ProcurementUser } from './procurement-user/procurement-user.entity';
import { User } from '@libs/core/users/user.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { VerificationCodesModule } from '@libs/core/verification-codes/verification-codes.module';
import { RequestItemsModule } from './request-items/request-items.module';
import { RequestItem } from './request-items/request-items.entity';
import { AuthModule } from 'apps/auth-plugin/src/auth/auth.module';

@Module({
  imports: [
    FileModule,
    RequestModule,
    // RoleModule,
    // UserModule,
    // ProcurementUserModule,
    // VerificationCodesModule,
    // RequestItemsModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        '/apps/procurement-plugin/src/procurement-schema.gql',
      ),
      sortSchema: true,
      playground: true,
      path: '/procurement',
    }),

    TypeOrmModule.forRoot(
      getDbConfig({
        db: 'postgres',
        entities: [
          File,
          Request,
          RequestItem,
          Role,
          ProcurementUser,
          User,
          VerificationCode,
        ],
      }),
    ),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
