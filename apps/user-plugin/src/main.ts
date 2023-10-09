import { NestFactory } from '@nestjs/core';
import { UserPluginModule } from './user-plugin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserPluginModule);
  const globalPrefix = 'api';
  const graphqlEndpoint = '/user';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5002;
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
