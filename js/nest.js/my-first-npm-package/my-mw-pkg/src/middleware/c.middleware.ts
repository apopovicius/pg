import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareC implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Middleware C');
    req.c = 'mw-c';
    next();
  }
}
