import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const graphql = process.env.GATEWAY_GRAPHQL;
  const host = process.env.GATEWAY_HOST;
  const port = process.env.GATEWAY_PORT;
  const url = process.env.GATEWAY_SERVICE ?? `http://${host}:${port}/${graphql}`

  await app.listen(port);

  Logger.log(
    `🚀 Gateway started on: ${url}`,
  );
}
bootstrap();
