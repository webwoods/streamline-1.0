import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
 
  const beHost = process.env.BE_HOST ?? 'localhost';
  const bePort = process.env.BE_PORT ?? 3333;

  const feHost = process.env.FE_HOST ?? 'localhost';
  const fePort = process.env.FE_PORT ?? 3000;

  app.enableCors({
    origin: `http://${feHost}:${fePort}`,
    credentials: true,
  });
  await app.listen(3333);

  console.log(`\n-----------------------------------------------------\n`);
  console.log(`Server is listening on: http://${beHost}/:${bePort}`);
  console.log(`Playground is listening on: http://${beHost}/:${bePort}/graphql`);
  console.log(`\n-----------------------------------------------------\n`);
}
bootstrap();
