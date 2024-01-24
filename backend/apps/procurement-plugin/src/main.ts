import { NestFactory } from '@nestjs/core';
import { ProcurementPluginModule } from './procurement-plugin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProcurementPluginModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const globalPrefix = process.env.PRC_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  const graphql = process.env.PRC_GATEWAY;
  const host = process.env.PRC_HOST;
  const port = process.env.PRC_PORT;
  const url = process.env.PRC_SERVICE ?? `http://${host}:${port}${graphql}`

  await app.listen(port);

  Logger.log(
    `🚀 Microservice started on: ${url}`,
  );
}
bootstrap();
