import { Test, TestingModule } from '@nestjs/testing';
import { AuthPluginController } from './auth-plugin.controller';
import { AuthPluginService } from './auth-plugin.service';

describe('AuthPluginController', () => {
  let authPluginController: AuthPluginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthPluginController],
      providers: [AuthPluginService],
    }).compile();

    authPluginController = app.get<AuthPluginController>(AuthPluginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authPluginController.getHello()).toBe('Hello World!');
    });
  });
});
