import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '../../libs/core/src/config/orm.config';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { AuthModule } from './auth/auth.module';
import { VerificationCodesModule } from './verification-codes/verification-codes.module';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { VerificationCode } from './verification-codes/verification-codes.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),

    TypeOrmModule.forRoot(
      getDbConfig({
        db: 'postgres',
        entities: [User, Role, VerificationCode],
      }),
    ),

    UserModule,
    RoleModule,
    AuthModule,
    VerificationCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
