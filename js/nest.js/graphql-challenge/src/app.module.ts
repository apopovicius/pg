import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AssetsModule } from './assets/assets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source-options';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { DataLoaderService } from './data-loader/data-loader.service';
import { CoinbaseModule } from './coinbase/coinbase.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      inject: [DataLoaderService],
      useFactory: (dataLoaderService: DataLoaderService) => {
        return {
          autoSchemaFile: 'schema.gql',
          installSubscriptionHandlers: true,
          context: () => ({ loaders: dataLoaderService.createLoaders() }),
        };
      },
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      synchronize: true,
    }),
    AssetsModule,
    DataLoaderModule,
    CoinbaseModule,
  ],
})
export class AppModule {}
