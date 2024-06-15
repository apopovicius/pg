import { Injectable } from '@nestjs/common';
import { Asset } from '../models/asset.model';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinbaseService } from '@App/coinbase/coinbase.service';
import { SyncAssetsAndPricesInput } from '../dto/create-asset.input.dto';
import { AssetPrice } from '../models/asset-price.model';
import { CurrencyWithPrice } from '@App/coinbase/coinbase.interface';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly repositoryAsset: Repository<Asset>,
    @InjectRepository(AssetPrice)
    private readonly repositoryAssetPrices: Repository<AssetPrice>,
    private readonly coinbaseService: CoinbaseService,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.repositoryAsset.find();
  }

  async find(symbol: string): Promise<Asset | null> {
    return this.repositoryAsset.findOne({ where: { symbol } });
  }

  async exists(symbol: string): Promise<Asset | null> {
    return this.repositoryAsset.findOne({
      where: { symbol },
      relations: {
        prices: true,
      },
    });
  }

  async findAssetsByBatch(assetIds: string[]): Promise<Asset[]> {
    const assets = await this.repositoryAsset.find({
      where: { id: In([...assetIds]) },
      relations: ['prices'],
    });

    return assets;
  }

  async syncAssetsAndPrices() {
    const currenciesWithPrice =
      await this.coinbaseService.getCurrenciesWithPrices();

    const newAssetList = await this.getNewAssets(currenciesWithPrice);
    console.time('SaveAssetInDB');
    if (newAssetList.length) await this.repositoryAsset.save(newAssetList);
    console.timeEnd('SaveAssetInDB');

    const assetPriceList = await this.getNewAssetPrices(currenciesWithPrice);
    console.time('SavePriceInDB');
    if (assetPriceList.length)
      await this.repositoryAssetPrices.save(assetPriceList);
    console.timeEnd('SavePriceInDB');
  }

  private async getNewAssets(currenciesWithPrice: CurrencyWithPrice[]) {
    console.time(this.getNewAssets.name);
    const existingAssets = await this.repositoryAsset.find();

    const assetList: Asset[] = [];
    for (const e of currenciesWithPrice) {
      let tempAsset = new Asset();
      const exists = existingAssets.find((ea) => ea.symbol === e.symbol);

      if (!exists) {
        tempAsset.name = e.name;
        tempAsset.symbol = e.symbol;
        tempAsset = this.repositoryAsset.create(tempAsset);
        assetList.push(tempAsset);
      }
    }
    console.timeEnd(this.getNewAssets.name);
    return assetList;
  }

  private async getNewAssetPrices(currenciesWithPrice: CurrencyWithPrice[]) {
    console.time(this.getNewAssetPrices.name);
    const existingAssets = await this.repositoryAsset.find();
    const priceList: AssetPrice[] = [];

    for (const e of currenciesWithPrice) {
      if (e.price <= 0 || !e.price) continue;
      const tempPrice = new AssetPrice();
      tempPrice.price = e.price;
      tempPrice.timestamp = new Date();

      const existingAsset = existingAssets.find((ea) => ea.symbol === e.symbol);

      if (!existingAsset) {
        console.error('Missing asset from db!');
        continue;
      }

      tempPrice.asset = existingAsset;

      const newPrice = this.repositoryAssetPrices.create(tempPrice);
      priceList.push(newPrice);
    }
    console.timeEnd(this.getNewAssetPrices.name);
    return priceList;
  }
}
