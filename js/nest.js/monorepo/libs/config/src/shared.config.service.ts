import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedConfigService {
  constructor(private readonly config: ConfigService) {}

  get demoConfig() {
    return {
      nodeEnv: this.config.getOrThrow<string>('nodeEnv'),
      appName: this.config.getOrThrow<string>('demoAppName'),
      port: this.config.getOrThrow<number>('demoPort'),
    };
  }

  get databaseConfig() {
    return {
      host: this.config.getOrThrow<string>('sqlite.host'),
      port: this.config.getOrThrow<number>('sqlite.port'),
    };
  }
}
