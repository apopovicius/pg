import { NestFactory } from '@nestjs/core';
import { DemoModule } from './demo.module';

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
