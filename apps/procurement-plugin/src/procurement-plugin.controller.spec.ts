import { Test, TestingModule } from '@nestjs/testing';
import { ProcurementPluginController } from './procurement-plugin.controller';
import { ProcurementPluginService } from './procurement-plugin.service';

describe('ProcurementPluginController', () => {
  let procurementPluginController: ProcurementPluginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcurementPluginController],
      providers: [ProcurementPluginService],
    }).compile();

    procurementPluginController = app.get<ProcurementPluginController>(ProcurementPluginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(procurementPluginController.getHello()).toBe('Hello World!');
    });
  });
});
