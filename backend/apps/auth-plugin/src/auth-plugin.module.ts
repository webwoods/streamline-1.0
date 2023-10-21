import { Module } from '@nestjs/common';
import { AuthPluginController } from './auth-plugin.controller';
import { AuthPluginService } from './auth-plugin.service';
import { User } from '@libs/core/entities/user.entity';
import { Role } from '@libs/core/entities/role.entity';
import { VerificationCode } from '@libs/core/entities/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AUTH_APP } from '@libs/core/constants/appInfo';
import { AuthModule } from '@libs/core/modules/auth.module';

@Module({
  imports: [
    AuthModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), AUTH_APP.schema),
      sortSchema: true,
      include: [AuthModule],
      playground: true,
      path: AUTH_APP.graphqlEndpoint,
    }),

    TypeOrmModule.forRoot(
      getDbConfig({
        db: { type: 'postgres' },
        entities: [User, Role, VerificationCode],
      }),
    ),
  ],
  controllers: [AuthPluginController],
  providers: [AuthPluginService],
})
export class AuthPluginModule {}
