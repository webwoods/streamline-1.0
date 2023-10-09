import { Test, TestingModule } from '@nestjs/testing';
import { AccountsBranchPluginController } from './accounts-branch-plugin.controller';
import { AccountsBranchPluginService } from './accounts-branch-plugin.service';

describe('AccountsBranchPluginController', () => {
  let accountsBranchPluginController: AccountsBranchPluginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountsBranchPluginController],
      providers: [AccountsBranchPluginService],
    }).compile();

    accountsBranchPluginController = app.get<AccountsBranchPluginController>(AccountsBranchPluginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(accountsBranchPluginController.getHello()).toBe('Hello World!');
    });
  });
});
