import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    const a = req.a;
    const b = req.b;
    const c = req.c;
    return this.appService.getHello(a, b, c);
  }
}
