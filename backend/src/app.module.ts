import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './common/config/ormconfig';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { RoleModule } from './modules/role.module';
import { RequestItemModule } from './modules/requestItem.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    
    TypeOrmModule.forRoot(getDbConfig('postgres')),

    UserModule,
    RoleModule,
    RequestItemModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
