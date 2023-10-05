import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@webwoods/streamline/dist/config/orm.config';
import { UserModule } from '@webwoods/streamline/dist/users/user.module';
import { RoleModule } from '@webwoods/streamline/dist/roles/role.module';
import { AuthModule } from './auth/auth.module';
import { VerificationCodesModule } from '@webwoods/streamline/dist/verification-codes/verification-codes.module';
import { User } from '@webwoods/streamline/dist/users/user.entity';
import { Role } from '@webwoods/streamline/dist/roles/role.entity';
import { VerificationCode } from '@webwoods/streamline/dist/verification-codes/verification-codes.entity';

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
