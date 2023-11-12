import { Module } from '@nestjs/common';
import { AuthPluginController } from './auth-plugin.controller';
import { AuthPluginService } from './auth-plugin.service';
import { User } from '@libs/core/entities/user.entity';
import { Role } from '@libs/core/entities/role.entity';
import { VerificationCode } from '@libs/core/entities/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from '@libs/core/modules/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, '/auth-schema.gql'),
      sortSchema: true,
      include: [AuthModule],
      playground: true,
      path: '/graphql',
      context: ({ req, res }) => ({ request: req, response: res }),
    }),

    TypeOrmModule.forRoot({
      type: process.env.AUTH_DB === 'postgres' ? 'postgres' : 'mysql',
      host: process.env.AUTH_DB_HOST,
      port: Number(process.env.AUTH_DB_PORT),
      username: process.env.AUTH_DB_USERNAME,
      password: process.env.AUTH_DB_PASSWORD,
      database: process.env.AUTH_DB_NAME,
      entities: [User, Role, VerificationCode],
      synchronize: true,
    }),
  ],
  controllers: [AuthPluginController],
  providers: [AuthPluginService],
})
export class AuthPluginModule {}
