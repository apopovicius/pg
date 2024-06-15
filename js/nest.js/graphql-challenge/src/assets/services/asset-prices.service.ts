import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetPrice } from '../models/asset-price.model';

@Injectable()
export class AssetPricesService {
  constructor(
    @InjectRepository(AssetPrice)
    private readonly repository: Repository<AssetPrice>,
  ) {}

  async findByAssetId(assetId: string): Promise<AssetPrice[]> {
    console.time(this.findByAssetId.name);
    console.log(`findByAssetId for assetId: ${assetId}`);
    const results = await this.repository.find({
      where: { asset: { id: assetId } },
      order: { timestamp: 'DESC' },
    });
    console.timeEnd(this.findByAssetId.name);
    return results;
  }

  async lastPriceByAssetId(assetId: string): Promise<AssetPrice> {
    console.time(this.findByAssetId.name);
    const result: AssetPrice[] = await this.repository.find({
      where: { asset: { id: assetId } },
      order: { timestamp: 'DESC' },
      take: 1,
    });
    console.timeEnd(this.findByAssetId.name);
    return result[0];
  }

  async lastPriceByAssetIdV2(assetId: string): Promise<AssetPrice[]> {
    console.time(this.lastPriceByAssetIdV2.name);
    const result: AssetPrice[] = await this.repository.find({
      where: { asset: { id: assetId } },
      order: { timestamp: 'DESC' },
      take: 1,
    });
    console.timeEnd(this.lastPriceByAssetIdV2.name);
    return result;
  }

  async lastPriceByAssetIdV3(assetId: string) {
    console.time(this.lastPriceByAssetIdV3.name);
    const subQuery = this.repository
      .createQueryBuilder('prices')
      .select('MAX(prices.timestamp)', 'maxDate')
      .where('prices.asset = :id', { id: assetId })
      .getQuery();

    const latestRecord = await this.repository
      .createQueryBuilder('prices')
      .select(['prices.asset', 'prices.timestamp', 'prices.price'])
      .where(`prices.timestamp = (${subQuery})`)
      .andWhere('prices.asset = :id', { id: assetId })
      .getOne();

    console.timeEnd(this.lastPriceByAssetIdV3.name);
    return latestRecord;
  }

  async findPricesByBatch(assetIds: string[]): Promise<AssetPrice[][]> {
    const prices = await this.repository.find({
      where: { asset: { id: In([...assetIds]) } },
      order: { timestamp: 'DESC' },
      relations: ['asset'],
    });

    const mappedResults = assetIds.map(
      (assetId) => prices.filter((price) => price.asset.id === assetId) || [],
    );
    return mappedResults;
  }
}
