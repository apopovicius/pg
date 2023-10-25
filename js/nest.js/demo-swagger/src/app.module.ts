import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CareerController } from './career/career.controller';
import { CareerService } from './career/career.service';

@Module({
  imports: [],
  controllers: [AppController, CareerController],
  providers: [AppService, CareerService],
})
export class AppModule {}
