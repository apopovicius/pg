export interface Currency {
  symbol: string;
  name: string;
}

export interface CurrencyWithPrice extends Currency {
  price: number;
}
