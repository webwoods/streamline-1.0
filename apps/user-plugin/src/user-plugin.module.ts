import { Module } from '@nestjs/common';
import { UserPluginController } from './user-plugin.controller';
import { UserPluginService } from './user-plugin.service';
import { User } from '@libs/core/users/user.entity';
import { Role } from '@libs/core/roles/role.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { VerificationCodesModule } from './verification-codes/verification-codes.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    VerificationCodesModule,
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/apps/user-plugin/src/user-schema.gql'),
      sortSchema: true,
      include: [UserModule, RoleModule, VerificationCodesModule],
      playground: true,
      path: '/user',
    }),

    TypeOrmModule.forRoot(getDbConfig({
      db: 'postgres',
      entities: [User, Role, VerificationCode]
    })),
  ],
  controllers: [UserPluginController],
  providers: [UserPluginService],
})
export class UserPluginModule {}