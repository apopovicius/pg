import { Test, TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

describe('DemoController', () => {
  let demoController: DemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DemoController],
      providers: [DemoService],
    }).compile();

    demoController = app.get<DemoController>(DemoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(demoController.getHello()).toBe('Hello World!');
    });
  });
});
