import { NestFactory } from '@nestjs/core';
import { ProcurementPluginModule } from './procurement-plugin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProcurementPluginModule);
  const globalPrefix = 'procurement';
  const graphqlEndpoint = 'procurement';
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