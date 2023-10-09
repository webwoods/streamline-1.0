import { Test, TestingModule } from '@nestjs/testing';
import { UserPluginController } from './user-plugin.controller';
import { UserPluginService } from './user-plugin.service';

describe('UserPluginController', () => {
  let userPluginController: UserPluginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserPluginController],
      providers: [UserPluginService],
    }).compile();

    userPluginController = app.get<UserPluginController>(UserPluginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userPluginController.getHello()).toBe('Hello World!');
    });
  });
});
