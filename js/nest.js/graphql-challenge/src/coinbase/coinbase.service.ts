import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Currency, CurrencyWithPrice } from './coinbase.interface';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CACHE_TTL,
  CURRENCY_CACHE_KEY,
  EXCHANGES_RATE_WITH_USD_URL,
  GET_CURRENCY_URL,
} from './coinbase.constants';

@Injectable()
export class CoinbaseService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async getAllCurrencies(): Promise<Currency[] | undefined> {
    let currencyList: Currency[] | undefined = await this.cacheManager.get(
      CURRENCY_CACHE_KEY,
    );
    if (!currencyList) {
      // call external API
      console.log('Getting currencies from COINBASE API');
      const { data } = await firstValueFrom(
        this.httpService.get(GET_CURRENCY_URL).pipe(
          catchError(() => {
            throw 'Error while fetching coinbase currencies';
          }),
        ),
      );

      currencyList = data.map((e) => ({
        symbol: e.id,
        name: e.name,
      }));
      await this.cacheManager.set(CURRENCY_CACHE_KEY, currencyList, CACHE_TTL);
    }

    return currencyList;
  }

  public async getExchangeRateForCurrency(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(EXCHANGES_RATE_WITH_USD_URL).pipe(
        catchError(() => {
          throw 'Error while fetching coinbase currencies';
        }),
      ),
    );
    return data.data;
  }

  public async getCurrenciesWithPrices(): Promise<CurrencyWithPrice[]> {
    const coinbaseAssetsPromise = this.getAllCurrencies();
    const pricesPromise = this.getExchangeRateForCurrency();
    const [coinbaseAssets, prices] = await Promise.all([
      coinbaseAssetsPromise,
      pricesPromise,
    ]);

    const assetsWithPrices: CurrencyWithPrice[] = [];
    if (!coinbaseAssets) return assetsWithPrices;

    for (const asset of coinbaseAssets) {
      const price = (prices.rates[asset.symbol] as number) || null;
      if (price) {
        const assetWithPrice = {
          name: asset.name,
          symbol: asset.symbol,
          price: 1 / price,
        };
        assetsWithPrices.push(assetWithPrice);
      }
    }
    return assetsWithPrices;
  }
}
