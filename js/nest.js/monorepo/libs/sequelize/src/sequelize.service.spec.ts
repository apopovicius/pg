import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeSharedService } from './sequelize.service';

describe('SequelizeSharedService', () => {
  let service: SequelizeSharedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SequelizeSharedService],
    }).compile();

    service = module.get<SequelizeSharedService>(SequelizeSharedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
