## Description

Thank-you for taking time to work on this code challenge.
We are excited to see what you can do!

This is a simple NestJS application implementing a GraphQL API.
It stores a list of assets and their associated prices.

Query implemented by the application:

```graphql
query Assets {
    assets {
        symbol
        name
        prices {
            price,
            timestamp
        }
    }
}
```

The goal of this challenge is to implement simple functionalities and respond to some theoretical questions.

## Instructions

Start by cloning this repository and creating a new branch with your name.
When you are done, push your branch to the remote repository and send us a link to your branch.

You can use any library you want to complete this challenge.
Here are our criteria for reviewing this challenge:
- Code quality (SOLID principles, design patterns, etc.)
- Code resilience
- Test coverage
- Readability

### First Part

Add a lastPrice field to the Asset type. this field should return the latest available price of the asset in USD (when
ordering by timestamp).

### Second Part

You may have noticed that listing the assets and their prices is very inefficient.
The current implementation will fetch the prices for each asset one by one.
Your second task is to refactor the code to fetch the prices in a single request.
You may need a library such as [DataLoader](https://github.com/graphql/dataloader) to do so.

### Third Part (Bonus)

This part is optional, but we would be happy to see your implementation.
The third part of this challenge is to implement a mutation to update the list of assets and their prices in USD.

The list of assets will be retrieved from the coinbase API:
https://api.exchange.coinbase.com/currencies ([see the documentation](https://docs.pro.coinbase.com/#get-currencies))

The exchange rate with USD will be retrieved from this API:
https://api.coinbase.com/v2/exchange-rates?currency=USD ([see the documentation](https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-exchange-rates))
you can use the `rates` field to get the exchange rate for each asset and retrieve the USD price for each asset.
Note that this API returns the ASSET/USD exchange rate, so you will need to calculate the price in USD for each asset.

We may not store an asset if we don't have a price for it.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Seed Data

```bash
$ npm run seed
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
