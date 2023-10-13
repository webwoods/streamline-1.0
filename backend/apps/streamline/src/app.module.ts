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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MAIN_APP } from '@libs/core/constants/appInfo';
import { Role } from '@libs/core/roles/role.entity';
import { User } from '@libs/core/users/user.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ProcurementUserModule,
    FileModule,
    RequestItemsModule,
    RequestModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), AUTH_APP.schema),
      sortSchema: true,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
