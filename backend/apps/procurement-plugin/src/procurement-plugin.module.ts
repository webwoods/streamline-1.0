import { Module } from '@nestjs/common';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { User } from '@libs/core/entities/user.entity';
import { VerificationCode } from '@libs/core/entities/verification-codes.entity';
import { PROCUREMENT_APP } from '@libs/core/constants/appInfo';
import { RequestItem } from '@libs/core/entities/request-items.entity';
import { Role } from '@libs/core/entities/role.entity';
import { Property } from '@libs/core/entities/property.entity';
import { File } from '@libs/core/entities/file.entity';
import { Request } from '@libs/core/entities/request.entity';
import { ProcurementModule } from '@libs/core/modules/procurement.module';

@Module({
  imports: [
    ProcurementModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), PROCUREMENT_APP.schema),
      sortSchema: true,
      playground: true,
      include: [ProcurementModule],
      path: PROCUREMENT_APP.graphqlEndpoint,
      context: ({ req, res }) => ({ request: req, response: res }),
    }),

    TypeOrmModule.forRoot(
      getDbConfig({
        db: { type: 'postgres' },
        entities: [
          User,
          Role,
          VerificationCode,
          Request,
          RequestItem,
          Property,
          File,
        ],
      }),
    ),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
  exports: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
