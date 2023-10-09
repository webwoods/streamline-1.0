import { NestFactory } from '@nestjs/core';
import { AccountsBranchPluginModule } from './accounts-branch-plugin.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountsBranchPluginModule);
  await app.listen(3000);
}
bootstrap();
