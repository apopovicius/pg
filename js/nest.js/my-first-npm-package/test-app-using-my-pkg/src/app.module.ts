import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MiddlewareA, MiddlewareB, MiddlewareC } from 'my-mw-pkg';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareA, MiddlewareB, MiddlewareC).forRoutes('*');
  }
}
