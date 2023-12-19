import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(a: string, b: string, c: string): string {
    return `Hello World! Receiving from sharedMW: mw1:${a}, mw2:${b}, mw3:${c}`;
  }
}
