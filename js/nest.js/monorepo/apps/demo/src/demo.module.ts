import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { SharedConfigModule } from '@shared/config';

@Module({
  imports: [SharedConfigModule],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
