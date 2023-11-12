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

  const graphqlEndpoint = process.env.PRC_GRAPHQL;
  const port = process.env.PRC_PORT;

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
