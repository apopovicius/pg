import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('Show and Tell')
    .setVersion('1.0')
    //.addServer('http://localhost:3000/', 'Local enviroment')
    .addTag('CAREER API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000);
}
bootstrap();
