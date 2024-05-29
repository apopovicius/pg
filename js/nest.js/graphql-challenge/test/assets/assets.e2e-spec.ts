import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@App/app.module';
import supertest from 'supertest';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { createDatabase, runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '@App/data-source-options';
import AssetsSeeder from '@App/database/seeds/assets.seeder';
import AssetsFactory from '@App/database/factories/assets.factory';
import AssetPricesFactory from '@App/database/factories/asset-prices.factory';

describe('AssetResolver (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    await createDatabase({
      options: dataSourceOptions,
    });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = app.get(getDataSourceToken(), { strict: false });
    await app.init();
    await runSeeders(dataSource, {
      seeds: [AssetsSeeder],
      factories: [AssetsFactory, AssetPricesFactory],
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Asset', () => {
    const doRequest = (query: string, overriddenVars = {}) => {
      const variables = Object.assign({}, overriddenVars);
      return supertest(app.getHttpServer()).post('/graphql').send({
        operationName: 'Assets',
        variables,
        query,
      });
    };

    describe('when requesting assets', () => {
      const query = `
      query Assets {
        assets {
          id
          symbol
          name
        }
      }
    `;

      it('retrieves a list of assets', async () => {
        await doRequest(query)
          .expect(({ body }): void => {
            expect(body.errors).toBeUndefined();
            expect(body.data.assets).toBeDefined();
            const assets = body.data.assets;
            expect(assets.length).toBeGreaterThan(0);
            assets.forEach((asset) => {
              expect(asset.id).toBeDefined();
              expect(asset.symbol).toMatch(/^[A-Z]{3,5}$/);
              expect(asset.name).toBeDefined();
            });
          })
          .expect(200);
      }, 30000);
    });

    describe('when requesting prices', () => {
      const query = `
      query Assets {
        assets {
          prices {
            price,
            timestamp
          }
        }
      }
    `;
      it('retrieves a list of prices for each asset', async () => {
        await doRequest(query)
          .expect(({ body }): void => {
            expect(body.errors).toBeUndefined();
            expect(body.data.assets).toBeDefined();
            const assets = body.data.assets;
            expect(assets.length).toBeGreaterThan(0);
            assets.forEach((asset) => {
              expect(asset.prices).toBeDefined();
              expect(asset.prices.length).toBeGreaterThan(0);
              asset.prices.forEach((price) => {
                expect(price.price).toBeDefined();
                expect(price.timestamp).toBeDefined();
              });
            });
          })
          .expect(200);
      }, 30000);
    });

    describe('when requesting assets with prices', () => {
      const query = `
      query Assets {
        assets {
          id
          symbol
          name
          lastPrice
          prices {
              price
              timestamp
          }
        }
      }
    `;

      it('retrieves a list of assets with prices', async () => {
        await doRequest(query)
          .expect(({ body }): void => {
            expect(body.errors).toBeUndefined();
            expect(body.data.assets).toBeDefined();
            const assets = body.data.assets;
            expect(assets.length).toBeGreaterThan(0);
            assets.forEach((asset) => {
              expect(asset.id).toBeDefined();
              expect(asset.symbol).toMatch(/^[A-Z]{3,5}$/);
              expect(asset.name).toBeDefined();
              expect(asset.prices).toBeDefined();
            });
          })
          .expect(200);
      }, 30000);

      it('make sure the lastPrice has latest value from assetPrices', async () => {
        await doRequest(query)
          .expect(({ body }): void => {
            expect(body.errors).toBeUndefined();
            expect(body.data.assets).toBeDefined();
            const assets = body.data.assets;
            expect(assets.length).toBeGreaterThan(0);
            assets.forEach((asset) => {
              expect(asset.id).toBeDefined();
              expect(asset.symbol).toMatch(/^[A-Z]{3,5}$/);
              expect(asset.name).toBeDefined();
              expect(asset.lastPrice).toBeDefined();
              expect(asset.prices).toBeDefined();
              expect(asset.prices.length).toBeGreaterThan(0);
              expect(asset.lastPrice).toBe(asset.prices[0].price);
            });
          })
          .expect(200);
      }, 30000);
    });
  });
});
