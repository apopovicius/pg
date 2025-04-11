import { Injectable } from '@nestjs/common';
import { SharedConfigService } from '@shared/config';

@Injectable()
export class DemoService {
  constructor(private readonly config: SharedConfigService) {}
  getHello(): string {
    const dbConfig = this.config.databaseConfig;
    return `Connecting to database at ${dbConfig.host}:${dbConfig.port}...`;
  }
}
