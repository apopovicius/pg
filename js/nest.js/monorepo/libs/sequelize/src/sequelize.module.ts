import { Module } from '@nestjs/common';
import { SequelizeSharedService } from './sequelize.service';

@Module({
  providers: [SequelizeSharedService],
  exports: [SequelizeSharedService],
})
export class SequelizeSharedModule {}
