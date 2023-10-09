import { Module } from '@nestjs/common';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@libs/core/config/orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/apps/procurement-plugin/src/procurement-schema.gql'),
      sortSchema: true,
      include: [],
      playground: true,
      path: '/procurement',
    }),

    TypeOrmModule.forRoot(getDbConfig({
      db: 'postgres',
      entities: []
    })),
  ],
  controllers: [ProcurementPluginController],
  providers: [ProcurementPluginService],
})
export class ProcurementPluginModule {}
