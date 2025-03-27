import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';
import { SharedConfigService } from '@shared/config';

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);
  const config = app.get(SharedConfigService);
  const demoConfig = config.demoConfig;
  console.log(`Booting [${demoConfig.appName}] on port ${demoConfig.port}...`);
  await app.listen(demoConfig.port);
}
bootstrap();
