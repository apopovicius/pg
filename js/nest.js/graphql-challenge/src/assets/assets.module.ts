import { Module } from '@nestjs/common';
import { AssetsResolver } from './resolvers/assets.resolver';
import { AssetsService } from './services/assets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './models/asset.model';
import { AssetPrice } from './models/asset-price.model';
import { AssetPricesService } from './services/asset-prices.service';
import { CoinbaseModule } from '@App/coinbase/coinbase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AssetPrice]), CoinbaseModule],
  providers: [AssetsResolver, AssetsService, AssetPricesService],
  exports: [AssetsService, AssetPricesService],
})
export class AssetsModule {}
