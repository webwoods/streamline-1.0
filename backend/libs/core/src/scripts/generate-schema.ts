import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { NestFactory } from '@nestjs/core';

interface GenerateSchemaProps {
  appName: string;
  resolvers: any[];
}

export async function generateSchema({
  appName,
  resolvers,
}: GenerateSchemaProps) {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);

  const printedSchema = printSchema(schema);
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), `${appName}-schema.gql`);

  fs.writeFile(filePath, printedSchema);

  console.log(`Schema successfully generated and saved to: ${filePath}`);

  await app.close();
}
