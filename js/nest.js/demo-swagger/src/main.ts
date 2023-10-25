import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip from payload the properties that are not described in DTO
      forbidNonWhitelisted: true, // throw error in case of attempt to use body proprieties that are not present in DTO
      transform: true
    })
  )
  await app.listen(3000);
}
bootstrap();
