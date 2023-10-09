import { Module } from '@nestjs/common';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';
import { User } from '@libs/core/users/user.entity';
import { Role } from '@libs/core/roles/role.entity';
import { VerificationCode } from '@libs/core/verification-codes/verification-codes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/apps/procurement-plugin/src/procurement-schema.gql'),
      sortSchema: true,
      include: [AuthModule],
      playground: true,
      path: '/procurement',
    }),

    TypeOrmModule.forRoot(getDbConfig({
      db: 'postgres',
      entities: [User, Role, VerificationCode]
    })),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
