import {
  Args,
  Float,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Context,
} from '@nestjs/graphql';
import { Asset } from '../models/asset.model';
import { AssetsService } from '../services/assets.service';
import { AssetPrice } from '../models/asset-price.model';
import { AssetPricesService } from '../services/asset-prices.service';
import { IDataLoaders } from '@App/data-loader/data-loader.interface';
import { SyncAssetsAndPricesInput } from '../dto/create-asset.input.dto';

@Resolver(() => Asset)
export class AssetsResolver {
  constructor(
    private readonly assetService: AssetsService,
    private readonly assetPricesService: AssetPricesService,
  ) {}

  @Query(() => [Asset])
  async assets() {
    return this.assetService.findAll();
  }

  @Query(() => Asset)
  async asset(@Args('symbol') symbol: string) {
    return this.assetService.find(symbol);
  }

  // @ResolveField(() => [AssetPrice])
  // async prices(@Parent() asset: Asset) {
  //   console.log(`obtaining price for assetId: ${asset.id}`);
  //   return this.assetPricesService.findByAssetId(asset.id);
  // }

  @ResolveField(() => [AssetPrice])
  async prices(
    @Parent() asset: Asset,
    @Context() { loaders }: { loaders: IDataLoaders },
  ) {
    return loaders.assetPriceLoader.load(asset.id);
  }

  // @ResolveField(() => Float)
  // async lastPrice(@Parent() asset: Asset) {
  //   const lastPrice = await this.assetPricesService.lastPriceByAssetIdV3(
  //     asset.id,
  //   );
  //   if (lastPrice) return lastPrice.price;
  // }

  @ResolveField(() => Float)
  async lastPrice(
    @Parent() asset: Asset,
    @Context() { loaders }: { loaders: IDataLoaders },
  ) {
    //TODO make sure you are using a new loader that will just query for the last price not the hole price list
    const prices = await loaders.assetPriceLoader.load(asset.id);
    return prices[0].price;
  }

  // @Mutation(() => [Asset])
  // async syncAsset(
  //   @Args('syncAssetsAndPricesInput')
  //   syncAssetsAndPricesInput: SyncAssetsAndPricesInput,
  // ) {
  //   console.time(this.syncAsset.name);
  //   await this.assetService.syncAssetsAndPrices(syncAssetsAndPricesInput);
  //   console.timeEnd(this.syncAsset.name);
  //   return this.assetService.findAll();
  // }

  @Mutation(() => [Asset])
  async syncAsset() {
    console.time(this.syncAsset.name);
    await this.assetService.syncAssetsAndPrices();
    console.timeEnd(this.syncAsset.name);
    return this.assetService.findAll();
  }
}
