import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const graphqlEndpoint = 'graphql/auth';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5001;
  await app.listen(port);
  Logger.log(
    `
    🚀 Application is running on: http://localhost:${port}/${globalPrefix}
    🚀 Graphql Server is running on: http://localhost:${port}/${graphqlEndpoint}
    🚀 Graphql Playground is running on: http://localhost:${port}/${graphqlEndpoint}/playground
    `
  );
}
bootstrap();
