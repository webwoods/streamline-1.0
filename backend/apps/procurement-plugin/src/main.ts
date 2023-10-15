import { NestFactory } from '@nestjs/core';
import { ProcurementPluginModule } from './procurement-plugin.module';
import { Logger } from '@nestjs/common';
import { PROCUREMENT_APP } from '@libs/core/constants/appInfo';

async function bootstrap() {
  const app = await NestFactory.create(ProcurementPluginModule);
  const globalPrefix = PROCUREMENT_APP.name;
  const graphqlEndpoint = PROCUREMENT_APP.graphqlEndpoint;
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || PROCUREMENT_APP.port;
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
