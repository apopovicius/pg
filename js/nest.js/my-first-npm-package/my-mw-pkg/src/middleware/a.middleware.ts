import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareA implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Middleware A');
    req.a = 'mw-a';
    next();
  }
}
