import { NestFactory } from '@nestjs/core';
import { TransportPluginModule } from './transport-plugin.module';

async function bootstrap() {
  const app = await NestFactory.create(TransportPluginModule);
  await app.listen(3000);
}
bootstrap();
