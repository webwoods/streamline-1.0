import { NestFactory } from '@nestjs/core';
import { AuthPluginModule } from './auth-plugin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthPluginModule);
  const globalPrefix = 'auth';
  const graphqlEndpoint = 'auth';
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