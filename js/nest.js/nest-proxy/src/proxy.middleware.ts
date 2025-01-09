import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UrlMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const baseTargetUrl = this.configService.get<string>('BASE_TARGET_URL') || 'https://docs.nestjs.com';
    req['proxyTargetUrl'] = `${baseTargetUrl}${req.originalUrl}`;
    next();
  }
}