import { NestFactory } from '@nestjs/core';
import { CrmPluginModule } from './crm-plugin.module';

async function bootstrap() {
  const app = await NestFactory.create(CrmPluginModule);
  await app.listen(3000);
}
bootstrap();
