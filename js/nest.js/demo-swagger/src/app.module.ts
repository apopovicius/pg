import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CareerController } from './career/career.controller';
//import { CareerService } from './career/career.service';
import { CareerModule } from './career/career.module';

@Module({
  imports: [CareerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
