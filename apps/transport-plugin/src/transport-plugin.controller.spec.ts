import { Test, TestingModule } from '@nestjs/testing';
import { TransportPluginController } from './transport-plugin.controller';
import { TransportPluginService } from './transport-plugin.service';

describe('TransportPluginController', () => {
  let transportPluginController: TransportPluginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransportPluginController],
      providers: [TransportPluginService],
    }).compile();

    transportPluginController = app.get<TransportPluginController>(TransportPluginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(transportPluginController.getHello()).toBe('Hello World!');
    });
  });
});
