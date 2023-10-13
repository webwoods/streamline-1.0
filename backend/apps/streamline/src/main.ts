import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MAIN_APP } from '@libs/core/constants/appInfo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = MAIN_APP.name;
  const graphqlEndpoint = MAIN_APP.graphqlEndpoint;
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || MAIN_APP.port;
  await app.listen(port);
  Logger.log(
    `
    🚀 Application is running on: http://localhost:${port}/${globalPrefix}
    🚀 Graphql Server is running on: http://localhost:${port}${graphqlEndpoint}
    🚀 Graphql Playground is running on: http://localhost:${port}${graphqlEndpoint}/playground
    `
  );
}
bootstrap();
