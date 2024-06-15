import { setSeederFactory } from 'typeorm-extension';
import { Asset } from '../../assets/models/asset.model';

export default setSeederFactory(Asset, (faker) => {
  const asset = new Asset();
  asset.name = faker.finance.currencyName();
  asset.symbol = faker.finance.currencyCode();

  return asset;
});
