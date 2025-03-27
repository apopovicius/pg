import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { appConfig } from './loaders/app.config';
import { authConfig } from './loaders/auth.config';
import { sqliteConfig } from './loaders/sqlite.db.config';
import { envValidationSchema } from './validation/.env.schema';
import { SharedConfigService } from './shared.config.service';
import { resolveEnvFile } from './shared.config.path';

const envFile = resolveEnvFile();
console.log(`Loading ${envFile} environment file...`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFile,
      load: [appConfig, authConfig, sqliteConfig],
      validationSchema: envValidationSchema,
    }),
  ],
  providers: [SharedConfigService],
  exports: [SharedConfigService],
})
export class SharedConfigModule {}
