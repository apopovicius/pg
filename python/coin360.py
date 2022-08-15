import requests
from datetime import datetime
import json



resp = requests.get('https://api.coin360.com/coin/latest?coin=ETH&convert=EUR')
data = resp.json()
doge = data['ETH']
quotes = doge['quotes']
usd = quotes['EUR']
price_usd = usd['price']
date_time = datetime.fromtimestamp(doge['timestamp'])
print(f'{date_time} with price: {price_usd}$ \n')
print(data)

resp = requests.get('https://api.coin360.com/info/currency')
with open('coins.json', 'w') as fh:
    json.dump(resp.json(), fh, indent=2)
