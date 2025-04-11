import { Test, TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { SharedConfigModule } from '@shared/config';

describe('DemoController', () => {
  let demoController: DemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SharedConfigModule],
      controllers: [DemoController],
      providers: [DemoService],
    }).compile();

    process.env.DB_HOST = 'X';
    process.env.DB_PORT = '12';
    demoController = app.get<DemoController>(DemoController);
  });

  describe('root', () => {
    it('getHello() have been called"', () => {
      expect(demoController.getHello()).toBeDefined();
    });
  });
});
