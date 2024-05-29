import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Asset } from '../../assets/models/asset.model';
import { AssetPrice } from '../../assets/models/asset-price.model';

export default class AssetsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('DELETE FROM asset');

    const assetFactory = factoryManager.get(Asset);
    const assetPricesFactory = factoryManager.get(AssetPrice);

    const assets = await assetFactory.saveMany(10000);

    await Promise.all(
      assets.map(async (asset) => {
        await assetPricesFactory.saveMany(10, { asset });
      }),
    );
  }
}
