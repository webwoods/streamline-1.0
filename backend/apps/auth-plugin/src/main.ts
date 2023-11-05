import { NestFactory } from '@nestjs/core';
import { AuthPluginModule } from './auth-plugin.module';
import { Logger } from '@nestjs/common';
import { AUTH_APP } from '@libs/core/constants/appInfo';

async function bootstrap() {
  const app = await NestFactory.create(AuthPluginModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const globalPrefix = AUTH_APP.name;
  app.setGlobalPrefix(globalPrefix);

  const graphqlEndpoint = AUTH_APP.graphqlEndpoint;
  const port = process.env.PORT || AUTH_APP.port;

  await app.listen(port);

  Logger.log(
    `
    🚀 Application is running on: http://localhost:${port}/${globalPrefix}
    🚀 Graphql Server is running on: http://localhost:${port}${graphqlEndpoint}
    🚀 Graphql Playground is running on: http://localhost:${port}${graphqlEndpoint}/playground
    `,
  );
}
bootstrap();
