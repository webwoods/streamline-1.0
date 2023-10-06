import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from 'core/src/lib/config/orm.config';
import { User } from 'core/src/lib/users/user.entity';
import { Role } from 'core/src/lib/roles/role.entity';
import { VerificationCode } from 'core/src/lib/verification-codes/verification-codes.entity';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/auth-plugin/src/assets/schema.gql'),
      sortSchema: true,
      playground: true,
      path: '/graphql/auth',
    }),

    TypeOrmModule.forRoot(getDbConfig({
      db: 'postgres',
      entities: [User, Role, VerificationCode]
    })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
