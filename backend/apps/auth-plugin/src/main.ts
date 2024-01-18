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

  const graphql = process.env.AUTH_GATEWAY;
  const host = process.env.AUTH_HOST;
  const port = process.env.AUTH_PORT;
  const url = process.env.AUTH_SERVICE ?? `http://${host}:${port}${graphql}`

  await app.listen(port);

  Logger.log(
    `🚀 Microservice started on: ${url}`,
  );
}
bootstrap();
