import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { AuthResolver } from '../../../../apps/auth-plugin/src/app/auth/auth.resolver';
import { UserResolver } from 'core/src/lib/users/user.resolver';
import { RoleResolver } from 'core/src/lib/roles/role.resolver';
import { NestFactory } from '@nestjs/core';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    AuthResolver,
    UserResolver,
    RoleResolver,
  ]);

  const printedSchema = printSchema(schema);
  const appName = 'auth-plugin';
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(`./apps/${appName}/src/assets/schema.gql`);

  fs.writeFile(filePath, printedSchema);

  console.log(`Schema successfully generated and saved to: ${filePath}`);

  await app.close();
}

generateSchema();