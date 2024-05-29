import { setSeederFactory } from 'typeorm-extension';
import { AssetPrice } from '../../assets/models/asset-price.model';

export default setSeederFactory(AssetPrice, (faker) => {
  const assetPrice = new AssetPrice();
  assetPrice.price = faker.number.float({ min: 1, max: 1000 });
  assetPrice.timestamp = faker.date.past();

  return assetPrice;
});
