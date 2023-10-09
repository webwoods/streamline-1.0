import { Test, TestingModule } from '@nestjs/testing';
import { CrmPluginController } from './crm-plugin.controller';
import { CrmPluginService } from './crm-plugin.service';

describe('CrmPluginController', () => {
  let crmPluginController: CrmPluginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CrmPluginController],
      providers: [CrmPluginService],
    }).compile();

    crmPluginController = app.get<CrmPluginController>(CrmPluginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(crmPluginController.getHello()).toBe('Hello World!');
    });
  });
});
