import { NestFactory } from '@nestjs/core';
import { AuthPluginModule } from './auth-plugin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthPluginModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const globalPrefix = process.env.AUTH_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  const graphqlEndpoint = process.env.AUTH_GRAPHQL;
  const port = process.env.AUTH_PORT;

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
