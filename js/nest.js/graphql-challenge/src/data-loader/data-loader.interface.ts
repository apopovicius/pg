import DataLoader from 'dataloader';
import { AssetPrice } from '@App/assets/models/asset-price.model';
import { Asset } from '@App/assets/models/asset.model';

export interface IDataLoaders {
  assetPriceLoader: DataLoader<string, AssetPrice[]>;
  assetLoader: DataLoader<string, Asset>;
}
