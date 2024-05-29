import { Injectable } from '@nestjs/common';
import { AssetPricesService } from '@App/assets/services/asset-prices.service';
import { AssetPrice } from '@App/assets/models/asset-price.model';
import DataLoader from 'dataloader';
import { IDataLoaders } from './data-loader.interface';
import { AssetsService } from '@App/assets/services/assets.service';
import { Asset } from '@App/assets/models/asset.model';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly assetPriceService: AssetPricesService,
    private readonly assetService: AssetsService,
  ) {}

  createLoaders(): IDataLoaders {
    const assetPriceLoader = new DataLoader<string, AssetPrice[]>(
      async (keys: string[]) =>
        this.assetPriceService.findPricesByBatch(keys as string[]),
    );

    const assetLoader = new DataLoader<string, Asset>(async (keys: string[]) =>
      this.assetService.findAssetsByBatch(keys as string[]),
    );

    return {
      assetPriceLoader,
      assetLoader,
    };
  }
}
