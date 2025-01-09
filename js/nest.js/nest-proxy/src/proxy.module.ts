import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { UrlMiddleware } from './proxy.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../.env',
  })],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UrlMiddleware) 
      .forRoutes('*');
  }
}
