import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareB implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Middleware B');
    req.b = 'mw-b';
    next();
  }
}
