import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoinbaseService } from './coinbase.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [CoinbaseService],
  exports: [CoinbaseService],
})
export class CoinbaseModule {}
